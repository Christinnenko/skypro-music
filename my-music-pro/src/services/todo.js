import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFavTracksApi = createApi({
  reducerPath: "getFavTracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/",
  }),
  endpoints: (builder) => ({
    getFavTracks: builder.query({
      query: () => ({
        url: "/catalog/track/favorite/all/",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.access)}`,
        },
      }),
      transformResponse: (response) => {
        return response.map((track) => ({ ...track, isFavorite: true }));
      },
      providesTags: (result) =>
        result
          ? [{ type: "isFavorite", id: "LIST" }]
          : [{ type: "isFavorite", id: "LIST" }],
    }),
    addToFavorites: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.access)}`,
        },
      }),
      invalidatesTags: [{ type: "isFavorite", id: "LIST" }],
    }),
    deleteFromFavorites: builder.mutation({
      query: ({ id }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.access)}`,
        },
      }),
      invalidatesTags: [{ type: "isFavorite", id: "LIST" }],
    }),
    viewSelectionsById: builder.query({
      query: ({ id }) => ({
        url: `/catalog/selection/${id}/`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.items.map((track) => ({ ...track, isFavorite: true }));
      },
    }),
  }),
});

export const {
  useGetFavTracksQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
  useViewSelectionsByIdQuery,
} = getFavTracksApi;
