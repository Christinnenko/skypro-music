import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFavTracksApi = createApi({
  reducerPath: "getFavTracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65a90a0b219bfa37186842ed.mockapi.io/api/",
  }),
  endpoints: (builder) => ({
    getTracks: builder.query({
      query: () => "v1/:endpoint",
    }),
  }),
});

export const { useGetFavTracksQuery } = getFavTracksApi;
