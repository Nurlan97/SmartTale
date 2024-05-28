//after update API client via npm run genApi, add this to http-client.ts file

// const redirectToAuth = (config: InternalAxiosRequestConfig<any>) => {
//   const abortCtrl = new AbortController();
//   abortCtrl.abort();
//   // config.signal = abortCtrl.signal;
//   userStore.logout();
//   window.location.assign(`${window.location.origin}/#/authorization`);
// };

//Put this to constructoor after this.securityWorker = securityWorker;

//  this.instance.interceptors.request.use(async (config) => {
//    if (userStore.isAuth) {
//      if (isTokenExpired(userStore.accessToken)) {
//        if (isTokenExpired(userStore.refreshToken)) {
//          redirectToAuth(config);
//        } else {
//          await userStore.refreshTokens();
//          config.headers['Authorization'] = `Bearer ${userStore.accessToken}`;
//        }
//      } else {
//        config.headers['Authorization'] = `Bearer ${userStore.accessToken}`;
//      }
//    }
//    return config;
//  });
// this.instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       console.log('обновление токенов');
//       await userStore.refreshTokens();
//       console.log('повторный запрос');
//       return this.instance(originalRequest);
//     }
//     redirectToAuth(error);
//   },
// );

// in V1.ts file
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
