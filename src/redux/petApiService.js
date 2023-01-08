import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: id => ({
        url: "pets",
        params: { id }
      }),
      transformResponse: res => res.pets[0]
    }),
    getBreeds: builder.query({
      query: animal => ({
        url: "breeds",
        params: { animal }
      }),
      transformResponse: res => res.breeds
    }),
    search: builder.query({
      query: ({ animal, location, breed }) => ({
        url: "pets",
        params: {animal, location, breed}
      }),
      transformResponse: res => res.pets
    })
  })
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;

