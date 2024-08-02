import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import UrlHelper from './UrlHelper';

export const sincelotAdminApi = createApi({
  reducerPath: 'sincelotAdminApi ',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adminbackend-lyyx.onrender.com/api/v1/',
  }),
  endpoints: builder => ({
    getData: builder.query({
      query: accessToken => ({
        url: 'user/profile',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR CREATE A WITHDRAW REQUEST
    createWithdraw: builder.mutation({
      query: ({accessToken, body}) => ({
        url: UrlHelper.WITHDRAW_PAYMENT_API,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR GETTING ALL THE LOCATION WITH TIME
    getAllLocationWithTime: builder.query({
      query: accessToken => ({
        url: 'result/alllotlocationwithtime',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // FOR BETTING

     // FOR GETTING DATE ACCORDING TO THE LOCATION, TIME
     getDateAccToLocTime: builder.query({
        query: (accessToken, lottimeId,lotlocationId) => ({
          url: `result/searchdate?llottime=${lottimeId}&lotlocation=${lotlocationId}`,
          method: 'get',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }),

    // FOR GETTING BET ACCORDING TO THE LOCATION, TIME AND CURRENT DATE
    getBetAccToLocTimeDate: builder.query({
      query: (accessToken, lotlocation, lottime, lotdate) => ({
        url: `result/playzone/singleplay?lotlocation=${lotlocation}&lottime=${lottime}&lotdate=${lotdate}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

     // FOR CREATE A PLAY REQUEST
     createPlay: builder.mutation({
      query: ({accessToken, body}) => ({
        url: UrlHelper.CREATE_PLAY_API,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),


    // FOR HISTORIES

     // FOR GETTING USERS PLAY HISTORY
     getPlayHistory: builder.query({
      query: accessToken => ({
        url: 'result/singleuser/playbets',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

     // FOR GETTING USERS HISTORY
     getHistory: builder.query({
      query: ({accesstoken,userId}) => ({
        url: "user/getuserdeposit/?userid="+userId,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A DEPOSIT REQUEST
    createDeposit: builder.mutation({
      query: ({accessToken, body}) => ({
        url: UrlHelper.DEPOSIT_API,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
        body,
      }),
    }),

    // FOR GETTING ALL COUNTRY LIST
    getAllCountry: builder.query({
      query: (accesstoken) => ({
        url: `result/allcurrencies`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A BALANCE TRANSFER REQUEST
    transferWalletBalance: builder.mutation({
      query: ({accessToken, body}) => ({
        url: UrlHelper.BALANCE_TRANSFER_TO_WALLET_TWO_API,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),


    // FOR ADMIN

    // FOR CREATE A UPI ACCOUNT
    createUPIAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: 'result/addupipayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

     // FOR DELETE A UPI ACCOUNT
     deleteUpiAccount: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removeupipayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),

    // FOR CREATE A BANK ACCOUNT
    createBankAccount: builder.mutation({
      query: ({ accesstoken, body }) => ({
        url: 'result/addbankpayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

     // FOR DELETE A BANK ACCOUNT
     deleteBankAccount: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removebankpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),

    // FOR CREATE A PAYPAL ACCOUNT
    createPaypalAccount: builder.mutation({
      query: ({ accesstoken, body }) => ({
        url: 'result/addpaypalpayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR DELETE A PAYPAL ACCOUNT
    deletePaypalAccount: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removepaypalpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),


     // FOR CREATE A SKRILL ACCOUNT
     createSkrillAccount: builder.mutation({
      query: ({ accesstoken, body }) => ({
        url: 'result/addskrillpayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

     // FOR DELETE A SKRILL ACCOUNT
     deleteSkrillAccount: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removeskrillpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),

     // FOR CREATE A CRYPTO ACCOUNT
     createCryptoAccount: builder.mutation({
      query: ({ accesstoken, body }) => ({
        url: 'result/addcryptopayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

     // FOR DELETE A CRYPTO ACCOUNT
     deleteCryptoAccount: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removecryptopayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),

     // FOR GETTING ALL DEPOSIT
     getAllDeposit: builder.query({
      query: (accesstoken) => ({
        url: "user/getalldeposit",
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR GETTING ALL WITHDRAW
    getAllWithdraw: builder.query({
      query: (accesstoken) => ({
        url: "user/getallwithdraw",
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),


    // FOR CREATE A CURRENCY
    createCurrency: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: 'result/addcurrency',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

     // FOR DELETE A CURRENCY
     deleteCurrency: builder.mutation({
      query: ({ accesstoken, id }) => ({
        url: `result/removecurrency/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      }),
    }),


     // FOR DELETE A CURRENCY
     updateCurrency: builder.mutation({
      query: ({ accesstoken, id, body }) => ({
        url: `result/updatecurrency/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body
      }),
    }),




     





    // ######## END #########
  }),
});

export const {
  useGetDataQuery,
  useCreateWithdrawMutation,
  useGetAllLocationWithTimeQuery,
  useGetDateAccToLocTimeQuery,
  useGetBetAccToLocTimeDateQuery,
  useCreatePlayMutation,
  useGetPlayHistoryQuery,
  useGetHistoryQuery,
  useCreateDepositMutation,
  useGetAllCountryQuery,
  useTransferWalletBalanceMutation,
  useCreateUPIAccountMutation,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useDeleteUpiAccountMutation,
  useCreatePaypalAccountMutation,
  useCreateSkrillAccountMutation,
  useCreateCryptoAccountMutation,
  useDeletePaypalAccountMutation,
  useDeleteSkrillAccountMutation,
  useDeleteCryptoAccountMutation,
  useGetAllDepositQuery,
  useGetAllWithdrawQuery,
  useCreateCurrencyMutation,
  useDeleteCurrencyMutation,
  useUpdateCurrencyMutation,

  
} = sincelotAdminApi ;
