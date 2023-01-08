import { configureStore } from '@reduxjs/toolkit';
import adoptedPetsReducer from "./AdoptedPetsSlice";
import searchParamsReducer from "./SearchParamsSlice";
import { petApi } from './petApiService';

const store = configureStore({
  reducer: {
    adoptedPets: adoptedPetsReducer,
    searchParams: searchParamsReducer,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(petApi.middleware)

});

export default store;
