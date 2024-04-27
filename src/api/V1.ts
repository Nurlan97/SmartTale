/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  FullPurchase,
  LoginResponse,
  Order,
  OrderDto,
  PagePurchase,
  PageSmallOrder,
  Product,
  Profile,
  RegistrationRequest,
  UpdateAdRequest,
  UpdateProfileRequest,
  VerificationRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class MyApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns basic information about the user and avatar
   *
   * @tags Account, get, profile, user, account
   * @name GetProfile
   * @summary Get own profile
   * @request GET:/v1/account/profile
   * @response `200` `Profile` Success
   * @response `401` `Profile` Unauthorized
   * @response `404` `Profile` Profile not found
   */
  getProfile = (params: RequestParams = {}) =>
    this.request<Profile, Profile>({
      path: `/v1/account/profile`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Requires all fields filled, returns Profile object
   *
   * @tags Account, profile, user, account, put
   * @name UpdateProfile
   * @summary Update own profile
   * @request PUT:/v1/account/profile
   * @response `200` `Profile` Success
   * @response `400` `Profile` Bad request
   * @response `401` `Profile` Unauthorized
   * @response `404` `Profile` Profile not found
   * @response `409` `Profile` Email or phone already exists
   */
  updateProfile = (data: UpdateProfileRequest, params: RequestParams = {}) =>
    this.request<Profile, Profile>({
      path: `/v1/account/profile`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns orders and products that belong to user, distinguish by "orderId" and "productId" field of objects
   *
   * @tags get, advertisement, My Advertisements, user, account
   * @name GetAds
   * @summary Get all ads
   * @request GET:/v1/account/advertisements
   * @response `200` `Order` Success
   * @response `400` `void` Bad request param
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  getAds = (
    query?: {
      /** Page number, default 0 */
      page?: any;
      /** Page size, default 10 */
      size?: any;
      /** Query orders or products */
      q?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<Order, void>({
      path: `/v1/account/advertisements`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description EP for updating an advertisement
   *
   * @tags advertisement, My Advertisements, user, put, account
   * @name UpdateAd
   * @summary Update ad
   * @request PUT:/v1/account/advertisements
   * @response `200` `string` Success
   * @response `400` `void` Validation failed
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  updateAd = (
    data: {
      dto: UpdateAdRequest;
      images?: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/account/advertisements`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Verify email by entering verification code
   *
   * @tags post, Authentication, authentication
   * @name VerifyEmail
   * @summary Verification
   * @request POST:/v1/auth/verification
   * @response `200` `LoginResponse` Email confirmed successfully
   * @response `400` `void` Invalid code
   * @response `404` `void` Profile not found
   */
  verifyEmail = (data: VerificationRequest, params: RequestParams = {}) =>
    this.request<LoginResponse, void>({
      path: `/v1/auth/verification`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Resend mail for user email verification
   *
   * @tags post, Authentication, authentication
   * @name Resend
   * @summary Resend mail
   * @request POST:/v1/auth/resend-verification
   * @response `200` `string` Email sent
   * @response `404` `void` Profile not found
   */
  resend = (data: string, params: RequestParams = {}) =>
    this.request<string, void>({
      path: `/v1/auth/resend-verification`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Create a new user account
   *
   * @tags post, Authentication, authentication
   * @name Register
   * @summary Registration
   * @request POST:/v1/auth/registration
   * @response `201` `string` Registration success
   * @response `400` `string` Invalid input
   * @response `409` `string` Email is already taken
   */
  register = (data: RegistrationRequest, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/auth/registration`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Obtain a new access token using refresh token
   *
   * @tags post, Authentication, authentication
   * @name RefreshToken
   * @summary Refresh
   * @request POST:/v1/auth/refresh-token
   * @response `200` `LoginResponse` Access token obtained successfully
   * @response `401` `void` Invalid token exception
   */
  refreshToken = (data: string, params: RequestParams = {}) =>
    this.request<LoginResponse, void>({
      path: `/v1/auth/refresh-token`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Accepts "Bearer " + "refreshToken" string in body and "Bearer " + "accessToken" via headers for further revocation and logging out
   *
   * @tags post, Authentication, authentication
   * @name Revoke
   * @summary Logout
   * @request POST:/v1/auth/logout
   * @response `200` `string` Revocation and logout success
   * @response `401` `string` Invalid token
   */
  revoke = (data: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/auth/logout`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name Login
   * @request POST:/v1/auth/login
   * @response `200` `string` OK
   */
  login = (data: string, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/v1/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Endpoint for pre-submit checking of available email. True if available
   *
   * @tags post, Authentication, authentication
   * @name CheckAvailable
   * @summary Check availability
   * @request POST:/v1/auth/email-available
   * @response `200` `boolean` Returns true or false
   */
  checkAvailable = (data: string, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/v1/auth/email-available`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Send subscription request to admin
   *
   * @tags Account, post, profile, user, account
   * @name Subscribe
   * @summary Subscription
   * @request POST:/v1/account/profile/subscription
   * @response `200` `string` Request success
   * @response `401` `string` Unauthorized
   * @response `404` `string` User not found
   */
  subscribe = (params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/account/profile/subscription`,
      method: 'POST',
      ...params,
    });
  /**
   * @description Upload an image using param "avatar" to set an avatar
   *
   * @tags Account, post, profile, user, account
   * @name UpdateAvatar
   * @summary Upload avatar
   * @request POST:/v1/account/profile/avatar
   * @response `200` `string` Success
   * @response `400` `void` Invalid file
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  updateAvatar = (
    query: {
      /** content type "image/" */
      avatar: any;
    },
    data: {
      /** @format binary */
      avatar: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/account/profile/avatar`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description It's not clear what PO wants, made for purchased products(equipments)
   *
   * @tags Purchase, get, purchase, user, account
   * @name GetPurchases
   * @summary All purchases
   * @request GET:/v1/account/purchases
   * @response `200` `PagePurchase` Success
   * @response `401` `void` Unauthorized
   */
  getPurchases = (
    query?: {
      /** Page number, default 0 */
      page?: any;
      /** Page size, default 8 */
      size?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<PagePurchase, void>({
      path: `/v1/account/purchases`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Get one purchase by unique id
   *
   * @tags Purchase, get, purchase, user, account
   * @name GetPurchase
   * @summary One purchase
   * @request GET:/v1/account/purchases/{productId}
   * @response `200` `FullPurchase` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Purchase not found
   */
  getPurchase = (productId: number, params: RequestParams = {}) =>
    this.request<FullPurchase, void>({
      path: `/v1/account/purchases/${productId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Retrieve all active or completed orders
   *
   * @tags My Orders, get, account, order
   * @name GetOrders
   * @summary Get orders
   * @request GET:/v1/account/orders
   * @response `200` `PageSmallOrder` Success
   * @response `400` `PageSmallOrder` Bad param
   * @response `401` `PageSmallOrder` Unauthorized
   * @response `404` `PageSmallOrder` User not found
   */
  getOrders = (
    query: {
      /** "active" or any other value for completed */
      q: any;
      /** Page number */
      page?: any;
      /** Page size */
      size?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageSmallOrder, PageSmallOrder>({
      path: `/v1/account/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Retrieve one order by id
   *
   * @tags My Orders, get, account, order
   * @name GetOrder
   * @summary Get order
   * @request GET:/v1/account/orders/{orderId}
   * @response `200` `OrderDto` Success
   * @response `401` `OrderDto` Unauthorized
   * @response `404` `OrderDto` Order not found
   */
  getOrder = (orderId: number, params: RequestParams = {}) =>
    this.request<OrderDto, OrderDto>({
      path: `/v1/account/orders/${orderId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Returns order or product that belongs to user, distinguish by "orderId" and "productId" field of object
   *
   * @tags get, advertisement, My Advertisements, user, account
   * @name GetAd
   * @summary Get one ad
   * @request GET:/v1/account/advertisements/{advertisementId}
   * @response `200` `Product` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  getAd = (advertisementId: number, params: RequestParams = {}) =>
    this.request<Product, void>({
      path: `/v1/account/advertisements/${advertisementId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description EP for close(1)/disclose(2)/delete(3)/restore(4) an ad
   *
   * @tags advertisement, My Advertisements, user, delete, account
   * @name InteractWithAd
   * @summary Action on ad
   * @request DELETE:/v1/account/advertisements/{advertisementId}/{actionId}
   * @response `200` `string` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  interactWithAd = (
    advertisementId: number,
    actionId: string,
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/account/advertisements/${advertisementId}/${actionId}`,
      method: 'DELETE',
      ...params,
    });
}
