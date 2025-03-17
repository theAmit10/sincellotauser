import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import UrlHelper from './UrlHelper';

// baseUrl: 'https://jenny.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru/api/v1/',

export const sincelotAdminApi = createApi({
  reducerPath: 'sincelotAdminApi ',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://dev.worldgames55fhgfg7sd8fvgsd8f6gs8dfgdsfgds6onion.ru/api/v1/',
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

    // [GET ALL SUBPARTNER]
    getAllSubPartner: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/getallsubpartner?page=${page}&limit=${limit}`,
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

    // [POWERBALL]

    // [GET ALL POWERTIMES]
    getAllPowerTimes: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getallpowertime`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [UPDATE POWER TIME]

    updatePowerballTime: builder.mutation({
      query: ({accesstoken, id, body}) => ({
        url: `user/updatepowertime/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [DELETE POWERBALL TIME]

    deletePowerballTime: builder.query({
      query: ({accesstoken, id}) => ({
        url: `user/removepowertime/${id}`,
        method: 'DELETE',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    deletePowerballTime: builder.mutation({
      query: ({accesstoken, id}) => ({
        url: `user/removepowertime/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    createPowerballTime: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/createpowertime`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [UPDATE POWERBALL GAME BASIC]
    updateGameBasic: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updategamedetails`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ADD POWERBALL GAME MULTIPLIER]
    addMultiplier: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/addmultipler`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [DELETE POWERBALL GAME MULTIPLIER]
    removeMultiplier: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/removemultipler`,
        method: 'DELETE',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [UPDATE POWERBALL WINNER PRIZE]
    updateWinnerPrize: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updatewinnerprize`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET POWERBALL GAME]

    getPowerBallGame: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getallpowerball`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [GET ALL POWER DATE BASED UPON TIME]
    getPowerDateBasedUponPowerTime: builder.query({
      query: ({accesstoken, id, page, limit}) => ({
        url: `user/getpowerdatebytime/${id}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [GET ALL PROFIT DEDUCTION]
    getAllProfitDeduction: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/getallprofitdeduction?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [UPDATE PARTNER PROFIT DEDUCTION BY ID]
    updatePartnerProfitDeduction: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updateprofitdeduction`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET ALL USERS]
    getAllUser: builder.query({
      query: ({accesstoken, page, limit}) => ({
        url: `user/alluser?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ SEARCH USERS]
    searchUser: builder.query({
      query: ({accesstoken, searchTerm}) => ({
        url: `user/searchuser/?searchTerm=${searchTerm}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [REMOVE TOP PATNER]
    removeTopPartner: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/removetoppartner`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [CREATE TOP PATNER]
    createPartner: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/createpartner`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET SETTING FOR MINIMUM PROFIT AND RECHARGE PERCENTAGE]
    getDefaultProfitAndRechargePercentage: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getsettings`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [UPDATE MINIMUM PROFIT AND RECHARGE PERCENTAGE]
    updateDefaultProfitAndRechargePercentage: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updatesetting`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET SINGLE PARTNER]
    getSinglePartner: builder.query({
      query: ({accesstoken, userId}) => ({
        url: `user/getpartnerbyuserid/${userId}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),
    // [GET SINGLE PARTNER RECHARGE PERMISSION]
    getSinglePartnerRechargeModule: builder.query({
      query: ({accesstoken, id}) => ({
        url: `user/getrechargebyid/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [UPDATE PARTNER PLAY AND TRANSACTION PERMISSION]
    updatePartnerPlayAndTransactionPermission: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updatepartnerpermission`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ACTIVATE PARTNER RECHARGE MODULE ]
    activatePartnerRechargeModule: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `result/updaterechargetouserandpartner`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [DEACTIVATE PARTNER RECHARGE MODULE ]
    deactivatePartnerRechargeModule: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `result/deactivatedrechargetouserandpartner`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ PARTNER RECHARGE MODULE PERMISSION UPDATE ]
    updateRechargePaymentMethodPermission: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `user/updaterechargepermission/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ CREATE NOTIFICATION ]
    createNotification: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/sendnotificationsingle/`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ UPDATE PROFIT PERCENTAGE ]
    updateProfit: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/increaseprofit`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ UPDATE RECHARGE PERCENTAGE ]
    updateRecharge: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/increaserecharge`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET PARTNER RECHARGE HISTORY]
    getPartnerRechargeHistory: builder.query({
      query: ({accesstoken, userId, page, limit}) => ({
        url: `user/getsinglepartnerrecharge/${userId}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ REMOVE USER FOR PARTNER USERLIST ]
    removeUserFromPartnerUserList: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/removeuserfromuserlist`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ UPDATE LIVE RESULT LINK ]
    updateLiveResultLink: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateresultelink/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [FOR GETTING RESULT FOR POWERBALL]
    getPowerballResult: builder.query({
      query: ({accesstoken, powertimeid, year, month}) => ({
        url: `result/allpowerresultmonyear?powertimeid=${powertimeid}&year=${year}&month=${month}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET POWER DATES
    getPowerDates: builder.query({
      query: ({accessToken, id}) => ({
        url: `user/getpowerdate/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),

    // GET ALL POWER TIMES
    getPowetTimes: builder.query({
      query: ({accesstoken}) => ({
        url: 'user/getallpowertime',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET POWERBALL GAME INSIGHTS
    getPowerballGameInsights: builder.query({
      query: ({accesstoken, powerdateId, powertimeId, page, limit}) => ({
        url: `user/getsinglepowerballtickets/${powerdateId}/${powertimeId}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // SEARCH JACKPOT NUMNER IN GAMEINSIGHTS
    searchJackpotGameInsights: builder.query({
      query: ({accesstoken, id, jackpot}) => ({
        url: `result/powerball/search?id=${id}&jackpot=${jackpot}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ ACTIVATE PAYPAL PARTNER PAYMENT METHOD ]
    activatePaypalPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatepaypalstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT PAYPAL PARTNER PAYMENT METHOD ]
    rejectPaypalPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatepaypalpaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ ACTIVATE SKRILL PARTNER PAYMENT METHOD ]
    activateSkrillPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateskrillstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT SKRILL PARTNER PAYMENT METHOD ]
    rejectSkrillPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateskrillpaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ ACTIVATE Bank PARTNER PAYMENT METHOD ]
    activateBankPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatebankstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT Bank PARTNER PAYMENT METHOD ]
    rejectBankPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatebankpaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ ACTIVATE crypto PARTNER PAYMENT METHOD ]
    activateCryptoPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatecryptostatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT crypto PARTNER PAYMENT METHOD ]
    rejectCryptoPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updatecryptopaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ ACTIVATE upi PARTNER PAYMENT METHOD ]
    activateUpiPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateupistatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT upi PARTNER PAYMENT METHOD ]
    rejectUpiPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateupipaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ create POWERBALL RESULT ]
    createPowerballResult: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `result/createpowerresult`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // GET POWERBALL GAME DETAILS
    getPowerball: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getallpowerball`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET SINGLE POWERBALL RESULT BASED UPON TIME AND DATE
    getResultBasedDateTimePowerResult: builder.query({
      query: ({accesstoken, powertimeid, powerdateid}) => ({
        url: `result/powerresultdatetime/${powertimeid}/${powerdateid}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // GET POWERBALL GAME DETAILS
    getAllRechargeAdmin: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getallrechargeadmin`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ UPDATE Sub PARTNER STATUS ]
    updateSubPartnerStatus: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updatesubpartner`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [GET PARTER PERFORMANCE ]
    getPartnerPerformance: builder.query({
      query: ({accesstoken, lotlocation, lottime, lotdate, page, limit}) => ({
        url: `result/singlepartnerperformance/${lotlocation}/${lottime}/${lotdate}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [GET PARTER PERFORMANCE POWERBALL ]
    getPartnerPerformancePowerball: builder.query({
      query: ({accesstoken, powertime, powerdate, page, limit}) => ({
        url: `result/singlepartnerperformancepowerball/${powertime}/${powerdate}?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // [ADD USER TO USERLIST]
    addUserToUserList: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/addusertouserlist`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [PROMOTE SUBPARTNER TO TOP PARTNER]
    promotePartnerToTopPartner: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/promotesubpartnertopartner`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [Give recharge module to user]
    giveRechargeModule: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updaterechargestatus`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // GET OTHER PAYMENT NAMES
    getOtherPaymentName: builder.query({
      query: ({accesstoken}) => ({
        url: `user/getopname`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR DELETE A OTHER PAYMENT ACCOUNT
    deleteOtherPaymentAccount: builder.mutation({
      query: ({accesstoken, id}) => ({
        url: `result/removeotherpayment/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }),
    }),

    // FOR CREATE A OTHER PAYMENT ACCOUNT
    createOtherPaymentAccount: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: 'result/addOtherPayment',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'multipart/form-data',
        },
        body,
      }),
    }),

    // [ ACTIVATE OTHER PAYMENT PARTNER PAYMENT METHOD ]
    activateOtherPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateotherstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // [ REJECT OTHER PAYMENT PARTNER PAYMENT METHOD ]
    rejectOtherPaymentMethod: builder.mutation({
      query: ({accesstoken, body, id}) => ({
        url: `result/updateotherpaymentstatus/${id}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    // [Give recharge module to user]
    updateOtherPaymentName: builder.mutation({
      query: ({accesstoken, body}) => ({
        url: `user/updateopname`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json',
        },
      }),
    }),

    // ######## END #########
  }),
});

export const {
  useUpdateOtherPaymentNameMutation,
  useActivateOtherPaymentMethodMutation,
  useRejectOtherPaymentMethodMutation,
  useCreateOtherPaymentAccountMutation,
  useDeleteOtherPaymentAccountMutation,
  useGetOtherPaymentNameQuery,
  useGiveRechargeModuleMutation,
  useGetPartnerPerformancePowerballQuery,
  usePromotePartnerToTopPartnerMutation,
  useAddUserToUserListMutation,
  useGetPartnerPerformanceQuery,
  useUpdateSubPartnerStatusMutation,
  useGetAllRechargeAdminQuery,
  useGetResultBasedDateTimePowerResultQuery,
  useGetPowerballQuery,
  useCreatePowerballResultMutation,
  useActivateCryptoPaymentMethodMutation,
  useActivateUpiPaymentMethodMutation,
  useRejectCryptoPaymentMethodMutation,
  useRejectUpiPaymentMethodMutation,
  useActivateBankPaymentMethodMutation,
  useRejectBankPaymentMethodMutation,
  useActivateSkrillPaymentMethodMutation,
  useRejectSkrillPaymentMethodMutation,
  useActivatePaypalPaymentMethodMutation,
  useRejectPaypalPaymentMethodMutation,
  useSearchJackpotGameInsightsQuery,
  useGetPowerballGameInsightsQuery,
  useGetPowetTimesQuery,
  useGetPowerDatesQuery,
  useGetPowerballResultQuery,
  useUpdateLiveResultLinkMutation,
  useRemoveUserFromPartnerUserListMutation,
  useGetPartnerRechargeHistoryQuery,
  useUpdateRechargeMutation,
  useUpdateProfitMutation,
  useCreateNotificationMutation,
  useUpdateRechargePaymentMethodPermissionMutation,
  useDeactivatePartnerRechargeModuleMutation,
  useActivatePartnerRechargeModuleMutation,
  useUpdatePartnerPlayAndTransactionPermissionMutation,
  useGetSinglePartnerRechargeModuleQuery,
  useGetSinglePartnerQuery,
  useUpdateDefaultProfitAndRechargePercentageMutation,
  useGetDefaultProfitAndRechargePercentageQuery,
  useRemoveTopPartnerMutation,
  useCreatePartnerMutation,
  useSearchUserQuery,
  useGetAllUserQuery,
  useUpdatePartnerProfitDeductionMutation,
  useGetAllProfitDeductionQuery,
  useGetAllSubPartnerQuery,
  useGetPowerDateBasedUponPowerTimeQuery,
  useAddMultiplierMutation,
  useGetPowerBallGameQuery,
  useUpdateGameBasicMutation,
  useRemoveMultiplierMutation,
  useUpdateWinnerPrizeMutation,
  useCreatePowerballTimeMutation,
  useGetAllPowerTimesQuery,
  useUpdatePowerballTimeMutation,
  useDeletePowerballTimeMutation,
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
