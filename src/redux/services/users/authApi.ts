import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import api from "../../../config/api.json";
import { server } from "../../../config/serverPoint";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: server + "api/v1/"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: api.auth.registration,
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: api.auth.login,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
