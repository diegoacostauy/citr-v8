import { QueryStatus, useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";
import { Animal, ApiBreedlistResponse } from "./types";

export default function useBreedList(animal: Animal) {
  const url = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;

  const { status, data } = useQuery<ApiBreedlistResponse>({
    queryKey: ["breeds", animal],
    queryFn: () => fetcher(url),
  });

  return [data?.breeds ?? [], status] as [string[], QueryStatus];
}
