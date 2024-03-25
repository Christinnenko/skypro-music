import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFavTracksApi = createApi({
  reducerPath: "getFavTracksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/",
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => ({
        url: "/catalog/track/all/",
      }),
      transformResponse: (response) => {
        return response.map((track) => {
          const id = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).id
            : null;
          const isFavorite = track.stared_user.find((user) => user.id === id);
          if (isFavorite) {
            return { ...track, isFavorite: true };
          } else {
            return { ...track, isFavorite: false };
          }
        });
      },
      providesTags: (result) =>
        result
          ? [{ type: "tracks", id: "LIST" }]
          : [{ type: "tracks", id: "LIST" }],
    }),
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
        return response.items.map((track) => {
          const id = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).id
            : null;
          const isFavorite = track.stared_user.find((user) => user.id === id);
          if (isFavorite) {
            return { ...track, isFavorite: true };
          } else {
            return { ...track, isFavorite: false };
          }
        });
      },
    }),
  }),
});

export const {
  useGetFavTracksQuery,
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
  useViewSelectionsByIdQuery,
  useGetAllTracksQuery,
} = getFavTracksApi;
