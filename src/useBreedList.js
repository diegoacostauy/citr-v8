import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./fetcher";

export default function useBreedList(animal) {
  const url = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`;
  const { status, data } = useQuery({
    queryKey: ["breeds", animal],
    queryFn: animal ? () => fetcher(url) : () => [],
  });

  return [data?.breeds ?? [], status];
}
