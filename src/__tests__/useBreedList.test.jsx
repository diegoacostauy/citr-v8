import { expect, test } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false
    }
  }
});


test("gives an empty list with no animal provided", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  });

  const [breedlist, status] = result.current;
  expect(breedlist).toHaveLength(0);
  expect(status).toBe("loading");
})

test("get back breeds when given an animal", async () => {
  const breeds = ["Havanese", "Bichon Frise", "Poodle", "Maltese", "Golden Retriever", "Labrador", "Husky"];
  fetch.mockResponseOnce(JSON.stringify({
    animal: "dog",
    breeds
  }));

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  });

  await waitFor(() => expect(result.current[1]).toBe("success"));
  const [breedlist] = result.current;
  expect(breedlist).toEqual(breeds);
})
