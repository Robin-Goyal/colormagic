import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import styled from "styled-components";
import { useGetBreedList, useGetCatsByBreedData } from "../api/cats";
import CatCard from "../components/CatCard";
import Spinner from "../components/Spinner";
import { useCats } from "../context/catContext";

const Heading = styled.h1`
  font-size: 3rem;
  color: "#000";
  font-weight: 400;
`;

const Title = styled.h6`
  font-size: 1rem;
  color: #000;
  opacity: 0.7;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #000;
  opacity: 0.5;
`;

export interface CatsByBreedParams {
  page: number;
  id: string;
}

const Home = () => {
  const state = useCats();

  const [loading, seLoading] = useState(false);

  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const { data: breedsList } = useGetBreedList();

  const { mutate } = useGetCatsByBreedData();

  const fetchCatsByBreeds = (page: number, id: string) => {
    mutate({ page, id });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Heading>Cat Browser</Heading>
        <Box sx={{ maxWidth: "400px", marginBottom: "2rem" }}>
          <Title>Breed</Title>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select breed</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state?.selectedBreed}
              label="Select breed"
              onChange={async (e) => {
                state?.setSelectedBreed(e.target.value);
                if (!e.target.value) return;

                // when selected value is different from choosing value reset page
                seLoading(true);

                if (state?.selectedBreed !== e.target.value) {
                  state?.setPage(1);
                  state?.setCats([]);
                  fetchCatsByBreeds(1, e.target.value);
                } else {
                  fetchCatsByBreeds(state?.page || 1, e.target.value);
                }

                seLoading(false);
              }}
            >
              {breedsList &&
                breedsList?.map((breed: any, i: number) => {
                  return (
                    <MenuItem key={`${breed.id}-${i}`} value={breed.id}>
                      {breed.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {Array.isArray(state?.cats) &&
                state?.cats &&
                state?.cats.map((cat: any, i: number) => (
                  <Grid key={`${cat.id}-${i}`} item xs={6} md={3}>
                    <CatCard id={cat.id} url={cat.url} />
                  </Grid>
                ))}
            </Grid>
          )}

          {(!state?.cats || state.cats.length === 0) && (
            <Text>No cats available</Text>
          )}

          {state?.cats && state.cats.length > 0 && (
            <Button
              disabled={loadMoreLoading}
              variant="contained"
              color="success"
              sx={{
                padding: "8px 20px",
                margin: "2rem 0",
                opacity: state?.selectedBreed ? 1 : 0.5,
              }}
              onClick={async () => {
                if (loadMoreLoading || !state?.selectedBreed) return;

                setLoadMoreLoading(true);
                const page = (state?.page || 1) + 1;
                state?.setPage(page);
                fetchCatsByBreeds(page, state.selectedBreed || "");

                setLoadMoreLoading(false);
              }}
            >
              Load more
            </Button>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Home;
