import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFavTracksApi = createApi({
  reducerPath: "getFavTracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/",
  }),
  endpoints: (builder) => ({
    getFavTracks: builder.query({
      query: ({ token }) => ({
        url: "/catalog/track/favorite/all/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToFavorites: builder.mutation({
      query: ({ id, token }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
    deleteFromFavorites: builder.mutation({
      query: ({ id, token }) => ({
        url: `/catalog/track/${id}/favorite/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFavTracksQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} = getFavTracksApi;
