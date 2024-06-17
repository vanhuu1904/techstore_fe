import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const vnpayApi = createApi({
  reducerPath: "vnpayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.vanhuu1904.click/api/v1",
    credentials: "include",
  }),
  // keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    createVNPay: builder.mutation({
      query(body) {
        return {
          url: "/create_payment_url",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useCreateVNPayMutation } = vnpayApi;
