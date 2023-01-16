import { useMutation, useQuery } from "@tanstack/react-query";
import { Cat, useCats } from "../context/catContext";
import { useNotification } from "../context/notificationCTx";
import { CatsByBreedParams } from "../pages/Home";
import { Config } from "../utils/config";

/**
 * @description fetch the breeds of cats
 */
export const useGetBreedList = () => {
  const notCtx = useNotification();

  const getBreeds = async () => {
    const res = await fetch(`${Config.apiUrl}breeds`);
    return res.json();
  };

  return useQuery(["breeds"], getBreeds, {
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
};

export const useGetCatsByBreedData = () => {
  const notCtx = useNotification();
  const state = useCats();

  return useMutation(
    ["catsByBreed"],
    async (data: CatsByBreedParams) => {
      const res = await fetch(
        `${Config.apiUrl}images/search?page=${data.page}&limit=${10}&breed_id=${
          data.id
        }`
      );

      let catsFromState: Cat[] = [];

      if (data.id === state?.selectedBreed) {
        catsFromState = state?.cats;
      }

      const result: Cat[] = await res.json();

      const newArr = [...catsFromState, ...result];

      const uniqueArray = newArr.filter((value, index) => {
        const _value = JSON.stringify(value);
        return (
          index ===
          newArr.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });

      state?.setCats(uniqueArray);

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
    }
  );
};

export const useGetCatDetails = (catId: string) => {
  const notCtx = useNotification();

  const getCatDetails = async () => {
    const res = await fetch(`${Config.apiUrl}images/${catId}`);
    return res.json();
  };

  return useQuery(["cat", catId], getCatDetails, {
    onError: () => {
      notCtx?.setProperties({
        content:
          "Apologies but we could not load new cats for you at this time! Miau!",
        type: "error",
        title: "Error",
      });

      notCtx?.show();
    },
    refetchOnMount: true,
  });
};
