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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import CatCard from "../components/CatCard";
import Spinner from "../components/Spinner";
import { Cat, useCats } from "../context/catContext";
import { useNotification } from "../context/notificationCTx";
import { Config } from "../utils/config";

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

interface Mutation {
  page: number;
  id: string;
}

const limit = 10;

const Home = () => {
  const notCtx = useNotification();

  const state = useCats();

  const [loading, seLoading] = useState(false);

  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const { data: breedsList } = useQuery(
    ["breeds"],
    async () => {
      const res = await fetch(`${Config.apiUrl}breeds`);
      const result = await res.json();

      return result;
    },
    {
      onError: () => {
        notCtx?.setProperties({
          content:
            "Apologies but we could not load new cats for you at this time! Miau!",
          type: "error",
          title: "Error",
        });

        notCtx?.show();
      },
      staleTime: 10000,
    }
  );

  const mutation = useMutation({
    mutationKey: ["catsByBreed"],
    mutationFn: async (data: Mutation) => {
      const res = await fetch(
        `${Config.apiUrl}images/search?page=${data.page}&limit=${limit}&breed_id=${data.id}`
      );

      let catsFromState: Cat[] = [];

      if (data.id === state?.selectedBreed) {
        catsFromState = state?.cats;
      }

      const result: Cat[] = await res.json();
      state?.setCats([...catsFromState, ...result]);
      return result;
    },
    onError: () => {
      notCtx?.setProperties({
        content:
          "Apologies but we could not load new cats for you at this time! Miau!",
        type: "error",
        title: "Error",
      });

      notCtx?.show();
    },
  });

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
                  await mutation.mutate({
                    page: 1,
                    id: e.target.value,
                  });
                } else {
                  await mutation.mutate({
                    page: state?.page || 1,
                    id: e.target.value,
                  });
                }

                seLoading(false);
              }}
            >
              {breedsList &&
                breedsList?.map((breed: any) => (
                  <MenuItem key={breed.id} value={breed.id}>
                    {breed.name}
                  </MenuItem>
                ))}
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
                state?.cats.map((cat: any) => (
                  <Grid key={cat.id} item xs={6} md={3}>
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
                mutation.mutate({
                  page,
                  id: state?.selectedBreed || "",
                });
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
