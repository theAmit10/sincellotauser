import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import UrlHelper from './UrlHelper';

// baseUrl: 'https://jenny.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru/api/v1/',

export const sincelotAdminApi = createApi({
  reducerPath: 'sincelotAdminApi ',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adminbackend-apsw.onrender.com/api/v1/',
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
      query: (accessToken, lottimeId, lotlocationId) => ({
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
      query: ({accesstoken, userId}) => ({
        url: 'user/getuserdeposit/?userid=' + userId,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR GETTING USERS SINGLE USER PLAY HISTORY
    getSingleUserPlayHistory: builder.query({
      query: ({accesstoken, userId}) => ({
        url: 'result/singleuserplayhistory/' + userId,
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
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

    // FOR GETTING ALL COUNTRY LIST
    getAllCountry: builder.query({
      query: accesstoken => ({
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
      query: ({accesstoken, id}) => ({
        url: `result/removeupipayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A BANK ACCOUNT
    createBankAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
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
      query: ({accesstoken, id}) => ({
        url: `result/removebankpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A PAYPAL ACCOUNT
    createPaypalAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
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
      query: ({accesstoken, id}) => ({
        url: `result/removepaypalpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A SKRILL ACCOUNT
    createSkrillAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
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
      query: ({accesstoken, id}) => ({
        url: `result/removeskrillpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A CRYPTO ACCOUNT
    createCryptoAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
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
      query: ({accesstoken, id}) => ({
        url: `result/removecryptopayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR GETTING ALL DEPOSIT
    getAllDeposit: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/getalldeposit?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR GETTING ALL WITHDRAW
    getAllWithdraw: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/getallwithdraw?page=${page}&limit=${limit}`,
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
      query: ({accesstoken, id}) => ({
        url: `result/removecurrency/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR DELETE A CURRENCY
    updateCurrency: builder.mutation({
      query: ({accesstoken, id, body}) => ({
        url: `result/updatecurrency/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          // 'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR CREATE A PLAYZONE
    createPlayzone: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: 'result/addplay',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR DELETE A PLAYZONE
    deletePlayzone: builder.mutation({
      query: ({accesstoken, id}) => ({
        url: `result/removeplayzone/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // For getting a single play for admin
    getSinglePlay: builder.query({
      query: ({accesstoken, lotlocation, lottime, lotdate}) => ({
        url: `result/playzone/singleplay?lotlocation=${lotlocation}&lottime=${lottime}&lotdate=${lotdate}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR DELETE A CURRENCY
    updateDepositPaymentStatus: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updateuserdeposit`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

    // FOR GETTING ALL BALANCE SHEET

    getAllBalance: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `result/balancesheet?page=${page}&limit=${limit}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR GETTING ALL SUB ADMIN
    getAllSubAdmin: builder.query({
      query: accesstoken => ({
        url: 'user/allsubadmin',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR UPDATE A LOCATION AUTOMATION
    updateLocationAutomation: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatelotlocation/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR GETTING NEXT RESULT TIME
    getNextResult: builder.query({
      query: ({accesstoken, locationid}) => ({
        url: `result/nextresult?locationid=${locationid}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    getAllPlayHome: builder.query({
      query: accesstoken => ({
        url: 'result/allplay',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR DELETE A SUB ADMIN
    deleteSubAdmin: builder.mutation({
      query: ({accesstoken, userId}) => ({
        url: `user/deleteuser/${userId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // RESET ANY USER PASSWORD
    resetSubAdminPassword: builder.mutation({
      query: ({body, userId, accesstoken}) => ({
        url: `user/updateuserpassword/${userId}/password`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR UPDATE SUB ADMIN FEATURE
    updateSubAdminFeature: builder.mutation({
      query: ({body, userId, accesstoken}) => ({
        url: `user/updatesubadmin/${userId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        body,
      }),
    }),

    // FOR GETTING ALL APP LINK
    getAppLink: builder.query({
      query: accesstoken => ({
        url: 'result/getapplink',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR ADDING APP LINK
    addAppLink: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: 'result/createapplink',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    // FOR DELETE App
    deleteAppLink: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `result/deleteapplink`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        body,
      }),
    }),

    // [ PARTNER MODULE START ]

    // FOR GETTING ALL PARTNER

    getAllPartner: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/getallpartner?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET PARTNER PARTNERLIST
    getPartnerPartnerList: builder.query({
      query: ({accesstoken, userId, page, limit}) => ({
        url: `user/getpartnerpartnerlist/${userId}?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          method: 'get',
        },
      }),
    }),

    // GET PARTNER USERLIST
    getPartnerUserList: builder.query({
      query: ({accesstoken, userId, page, limit}) => ({
        url: `user/getpartneruserlist/${userId}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    searchPartnerUserList: builder.query({
      query: ({accesstoken, userId, query}) => ({
        url: `user/searchuserlist/${userId}?query=${query}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    searchPartnerPartnerList: builder.query({
      query: ({accesstoken, userId, query}) => ({
        url: `user/searchpartnerlist/${userId}?query=${query}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ SEARCH PARTNER]
    searchPartner: builder.query({
      query: ({accesstoken, searchTerm}) => ({
        url: `user/searchpartner/?searchTerm=${searchTerm}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ SEARCH SUB PARTNER]
    searchSubPartner: builder.query({
      query: ({accesstoken, searchTerm}) => ({
        url: `user/searchusubpartner/?searchTerm=${searchTerm}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // ######## END #########
  }),
});

export const {
  useSearchPartnerQuery,
  useSearchSubPartnerQuery,
  useSearchPartnerPartnerListQuery,
  useSearchPartnerUserListQuery,
  useGetPartnerPartnerListQuery,
  useGetPartnerUserListQuery,
  useGetAllPartnerQuery,
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
  useCreatePlayzoneMutation,
  useDeletePlayzoneMutation,
  useGetSinglePlayQuery,
  useUpdateDepositPaymentStatusMutation,
  useGetAllBalanceQuery,
  useGetAllSubAdminQuery,
  useUpdateLocationAutomationMutation,
  useGetNextResultQuery,
  useGetAllPlayHomeQuery,
  useGetSingleUserPlayHistoryQuery,
  useDeleteSubAdminMutation,
  useUpdateSubAdminFeatureMutation,
  useResetSubAdminPasswordMutation,
  useGetAppLinkQuery,
  useAddAppLinkMutation,
  useDeleteAppLinkMutation,
} = sincelotAdminApi;
