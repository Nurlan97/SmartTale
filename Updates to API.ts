//after update API client via npm run genApi, add this to http-client.ts file

// const redirectToAuth = (config: InternalAxiosRequestConfig<any>) => {
//   const abortCtrl = new AbortController();
//   abortCtrl.abort();
//   config.signal = abortCtrl.signal;
//   removeCookie('accessToken');
//   removeCookie('refreshToken');
//   window.location.assign(`${window.location.origin}/#/authorization`);
// };

//Put this to constructoor after this.securityWorker = securityWorker;

//  this.instance.interceptors.request.use(async (config) => {
//    if (!!String(config.headers['Authorization'])) {
//      const oldAccessToken = String(config.headers['Authorization']).split(' ')[1];
//      if (!oldAccessToken) {
//        redirectToAuth(config);
//      } else {
//        if (isTokenExpired(oldAccessToken)) {
//          if (isTokenExpired(userStore.refreshToken)) {
//            redirectToAuth(config);
//          } else {
//            await userStore.refreshTokens();
//            config.headers['Authorization'] = `Bearer ${userStore.accessToken}`;
//          }
//        }
//      }
//    }
//    return config;
//  });

// in Va.ts file
// getAds1 = (
//   query?: {
//     /** Page number, default 0 */
//     page?: any;
//     /** Page size, default 10 */
//     size?: any;
//     /** Query orders or products */
//     q?: any;
//   },
//   params: RequestParams = {},
// ) =>
//   this.request<IAdsResponse, void>({    //change types for response
//     path: `/v1/account/advertisements`,
//     method: 'GET',
//     query: query,
//     ...params,
//   });
