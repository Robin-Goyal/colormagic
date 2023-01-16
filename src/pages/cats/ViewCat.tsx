import { Button, CardMedia } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCatDetails } from "../../api/cats";
import { useNotification } from "../../context/notificationCTx";
import { Config } from "../../utils/config";

const Heading = styled.h1`
  font-size: 2rem;
  color: "#000";
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 0.5rem;
`;

const Span = styled.h4`
  font-size: 1.2rem;
  color: "#000";
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: 0px;
`;

const Tempernate = styled.h6`
  font-size: 1rem;
  color: "#000";
  font-weight: 400;
  opacity: 0.9;
  margin-top: 0px;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: "#000";
  font-weight: 400;
  opacity: 0.8;
  margin-top: 0px;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ViewCat = () => {
  const { catId } = useParams();
  const navigate = useNavigate();

  const { data: cat } = useGetCatDetails(catId as string);

  return (
    <Container maxWidth="xl">
      <Box
        bgcolor={"#f6f6f6"}
        height={"80px"}
        paddingX="2rem"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      {cat && (
        <>
          <Box width={"100%"}>
            <Box marginBottom={"2rem"}>
              <Image src={cat.url} alt={cat.url} />
            </Box>
          </Box>
          {cat.breeds && cat.breeds.length > 0 && (
            <Box paddingY={"1rem"} paddingX="1.2rem">
              <Heading>{cat.breeds[0].name}</Heading>
              <Span>Origin: {cat.breeds[0].origin}</Span>
              <Tempernate>{cat.breeds[0].temperament}</Tempernate>
              <Description>{cat.breeds[0].description}</Description>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ViewCat;
