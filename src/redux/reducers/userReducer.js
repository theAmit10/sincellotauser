import {createReducer} from '@reduxjs/toolkit';

// Below Reducer can login, Register, get Profile, logout

export const userReducer = createReducer(
  {
    loading: false,
    loadingAll: false,
    allusers: [],
    promotions: [],
    loadingPromotion: false,
    loadingAbout: false,
    abouts: [],
    loadingChangePassword: false,
    loadingSingleUser: false,
    singleuser: {},
    loadingAllOneDayUser: false,
    allonedayusers: [],
    loadingNotification: false,
  },
  builder => {
    builder
      .addCase('loginRequest', state => {
        state.loading = true;
      })
      .addCase('loadUserRequest', state => {
        state.loading = true;
      })
      .addCase('logoutRequest', state => {
        state.loading = true;
      })
      .addCase('registerRequest', state => {
        state.loading = true;
      })
      .addCase('allUserRequest', state => {
        state.loadingAll = true;
      })
      .addCase('updateWalletRequest', state => {
        state.loading = true;
      })
      .addCase('getAllPromotionRequest', state => {
        state.loadingPromotion = true;
      })
      .addCase('getAllAboutRequest', state => {
        state.loadingAbout = true;
      })
      .addCase('getChangePasswordRequest', state => {
        state.loadingChangePassword = true;
      })
      .addCase('getSingleUserLoadingRequest', state => {
        state.loadingSingleUser = true;
      })
      .addCase('getAllOneDayUserLoadingRequest', state => {
        state.loadingAllOneDayUser = true;
      })
      .addCase('getAllNotificationRequest', state => {
        state.loadingNotification = true;
      });

    builder
      .addCase('loginSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('loadUserSuccess', (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase('logoutSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase('registerSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('allUserSuccess', (state, action) => {
        state.loadingAll = false;
        state.allusers = action.payload;
      })
      .addCase('updateWalletSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('getAllPromotionSuccess', (state, action) => {
        state.loadingPromotion = false;
        state.promotions = action.payload;
      })
      .addCase('getAllAboutSuccess', (state, action) => {
        state.loadingAbout = false;
        state.abouts = action.payload;
      })
      .addCase('getChangePasswordSuccess', (state, action) => {
        state.loadingChangePassword = false;
        state.message = action.payload;
      })
      .addCase('getSingleUserSuccess', (state, action) => {
        state.loadingSingleUser = false;
        state.singleuser = action.payload;
      })
      .addCase('getAllOneDayUserSuccess', (state, action) => {
        state.loadingAllOneDayUser = false;
        state.allonedayusers = action.payload;
      })
      .addCase('getAllNotificationSuccess', (state, action) => {
        state.loadingNotification = false;
        state.notifications = action.payload;
      });

    builder
      .addCase('loginFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('loadUserFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('logoutFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('allUserFail', (state, action) => {
        state.loadingAll = false;
        state.error = action.payload;
      })
      .addCase('updateWalletFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getAllPromotionFail', (state, action) => {
        state.loadingPromotion = false;
        state.error = action.payload;
      })
      .addCase('getAllAboutFail', (state, action) => {
        state.loadingAbout = false;
        state.error = action.payload;
      })
      .addCase('registerFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('changePasswordFail', (state, action) => {
        state.loadingChangePassword = false;
        state.error = action.payload;
      })
      .addCase('getSingleUserFail', (state, action) => {
        state.loadingSingleUser = false;
        state.error = action.payload;
      })
      .addCase('getAllOneDayUserFail', (state, action) => {
        state.loadingAllOneDayUser = false;
        state.error = action.payload;
      })
      .addCase('getAllNotificationFail', (state, action) => {
        state.loadingNotification = false;
        state.error = action.payload;
      });

    builder.addCase('getaccesstoken', (state, action) => {
      state.accesstoken = action.payload;
    });
    builder.addCase('clearError', state => {
      state.error = null;
    });
    builder.addCase('clearMessage', state => {
      state.message = null;
    });
    builder.addCase('clearAllUsers', state => {
      state.allusers = [];
    });
    builder.addCase('clearAllPromotion', state => {
      state.promotions = [];
    });
    builder.addCase('clearAllAbout', state => {
      state.abouts = [];
    });
    builder.addCase('clearSingleUser', state => {
      state.singleuser = {};
    })
    builder.addCase('clearAllOneDayUser', state => {
      state.allonedayusers = [];
    });
    builder.addCase('clearAllNotication', state => {
      state.notifications = [];
    });
  },
);

// import {createReducer} from '@reduxjs/toolkit';

// // Below Reducer can login, Register, get Profile, logout

// export const userReducer = createReducer(
//   {
//     loading: false,
//     loadingAll: false,
//     allusers: [],
//     promotions: [],
//     loadingPromotion: false,
//     loadingAbout: false,
//     abouts: [],
//     loadingChangePassword: false,
//     loadingLogin: false,
//   },
//   builder => {
//     builder
//       .addCase('loginRequest', state => {
//         state.loading = true;
//       })
//       .addCase('loadUserRequest', state => {
//         state.loading = true;
//       })
//       .addCase('logoutRequest', state => {
//         state.loading = true;
//       })
//       .addCase('registerRequest', state => {
//         state.loading = true;
//       })
//       .addCase('allUserRequest', state => {
//         state.loadingAll = true;
//       })
//       .addCase('updateWalletRequest', state => {
//         state.loading = true;
//       })
//       .addCase('getAllPromotionRequest', state => {
//         state.loadingPromotion = true;
//       })
//       .addCase('getAllAboutRequest', state => {
//         state.loadingAbout = true;
//       })
//       .addCase('getChangePasswordRequest', state => {
//         state.loadingChangePassword = true;
//       });

//     builder
//       .addCase('loginSuccess', (state, action) => {
//         state.loading  = false;
//         state.message = action.payload;
//       })
//       .addCase('loadUserSuccess', (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase('logoutSuccess', (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase('registerSuccess', (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       })
//       .addCase('allUserSuccess', (state, action) => {
//         state.loadingAll = false;
//         state.allusers = action.payload;
//       })
//       .addCase('updateWalletSuccess', (state, action) => {
//         state.loading = false;
//         state.message = action.payload;
//       })
//       .addCase('getAllPromotionSuccess', (state, action) => {
//         state.loadingPromotion = false;
//         state.promotions = action.payload;
//       })
//       .addCase('getAllAboutSuccess', (state, action) => {
//         state.loadingAbout = false;
//         state.abouts = action.payload;
//       })
//       .addCase('getChangePasswordSuccess', (state, action) => {
//         state.loadingChangePassword = false;
//         state.message = action.payload;
//       });

//     builder
//       .addCase('loginFail', (state, action) => {
//         state.loading  = false;
//         state.error = action.payload;
//       })
//       .addCase('loadUserFail', (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase('logoutFail', (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase('allUserFail', (state, action) => {
//         state.loadingAll = false;
//         state.error = action.payload;
//       })
//       .addCase('updateWalletFail', (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase('getAllPromotionFail', (state, action) => {
//         state.loadingPromotion = false;
//         state.error = action.payload;
//       })
//       .addCase('getAllAboutFail', (state, action) => {
//         state.loadingAbout = false;
//         state.error = action.payload;
//       })
//       .addCase('registerFail', (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase('changePasswordFail', (state, action) => {
//         state.loadingChangePassword = false;
//         state.error = action.payload;
//       });

//     builder.addCase('getaccesstoken', (state, action) => {
//       state.accesstoken = action.payload;
//     });
//     builder.addCase('clearError', state => {
//       state.error = null;
//     });
//     builder.addCase('clearMessage', state => {
//       state.message = null;
//     });
//     builder.addCase('clearAllUsers', state => {
//       state.allusers = [];
//     });
//     builder.addCase('clearAllPromotion', state => {
//       state.promotions = [];
//     });
//     builder.addCase('clearAllAbout', state => {
//       state.abouts = [];
//     });
//   },
// );
