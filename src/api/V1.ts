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
  CreateAdRequest,
  CreateOrgRequest,
  DashboardOrder,
  EmployeeTasksResponse,
  FullOrder,
  FullOrderCard,
  FullProduct,
  FullProductCard,
  InviteRequest,
  LoginResponse,
  MonitoringOrder,
  Order,
  OrderDto,
  Organization,
  PageCard,
  PageEmployee,
  PageOrderSummary,
  PageOrganizationSummary,
  PageSmallOrder,
  Position,
  PositionDto,
  PositionSummary,
  Product,
  Profile,
  RegistrationRequest,
  UpdateAdRequest,
  UpdateEmployeeRequest,
  UpdateProfileRequest,
  UpdateTaskRequest,
  VerificationRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class MyApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Organization, get, organization
   * @name GetOrganization
   * @summary Get own Org
   * @request GET:/v1/organization
   * @response `200` `Organization` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Org not found
   */
  getOrganization = (params: RequestParams = {}) =>
    this.request<Organization, void>({
      path: `/v1/organization`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, organization, put
   * @name UpdateOrganization
   * @summary Update organization
   * @request PUT:/v1/organization
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` User is not an owner
   * @response `404` `string` Org not found
   */
  updateOrganization = (
    data: {
      dto: CreateOrgRequest;
      /** @format binary */
      logo?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string>({
      path: `/v1/organization`,
      method: 'PUT',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, post, organization
   * @name CreateOrganization
   * @summary Create organization
   * @request POST:/v1/organization
   * @response `201` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` User is not subscribed or already in Organization
   * @response `404` `string` User not found
   */
  createOrganization = (
    data: {
      dto: CreateOrgRequest;
      /** @format binary */
      logo?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string>({
      path: `/v1/organization`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Get all positions of organization
   *
   * @tags Organization, organization, get, position, employee
   * @name GetAllPositions
   * @summary All positions
   * @request GET:/v1/organization/positions
   * @response `200` `(PositionSummary)[]` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` No permission
   * @response `404` `void` User or organization not found
   */
  getAllPositions = (params: RequestParams = {}) =>
    this.request<PositionSummary[], void>({
      path: `/v1/organization/positions`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Evaluates hierarchy and authorities then updates,positionId shouldn't be null
   *
   * @tags Organization, organization, position, put
   * @name UpdatePosition
   * @summary Update position
   * @request PUT:/v1/organization/positions
   * @response `200` `string` Success
   * @response `400` `string` Bad request
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` User, org or position not found
   */
  updatePosition = (data: Position, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/positions`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Evaluates hierarchy and authorities then creates. Position id should be empty or 0
   *
   * @tags Organization, post, organization, position
   * @name CreatePosition
   * @summary Create position
   * @request POST:/v1/organization/positions
   * @response `201` `string` Success
   * @response `400` `string` Bad request
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` User or org not found
   */
  createPosition = (data: Position, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/positions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get all employees and invitees of organization
   *
   * @tags Organization, organization, get, employee, user, account
   * @name GetEmployees
   * @summary Get employees
   * @request GET:/v1/organization/employees
   * @response `200` `PageEmployee` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getEmployees = (
    query: {
      /** Page number. Default 0 */
      page?: any;
      /** Page size. Default 10 */
      size?: any;
      /** Sorts by name. name=asc/desc */
      name?: any;
      /** Sorts by active orders number */
      orders?: any;
      /** Not a property, needs front implementation */
      status?: any;
      /** Sorting property. Equals to object field. Can be multiplesorting properties. Default "name" */
      '[sort]'?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageEmployee, void>({
      path: `/v1/organization/employees`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, organization, position, employee, put
   * @name UpdateEmployeePosition
   * @summary Change employee position
   * @request PUT:/v1/organization/employees
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` Employee or Position not found
   */
  updateEmployeePosition = (data: UpdateEmployeeRequest, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/employees`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Sends email to invited person's address
   *
   * @tags Organization, post, organization, employee, user, account
   * @name InviteEmployee
   * @summary Invite employee
   * @request POST:/v1/organization/employees
   * @response `201` `string` Invite successful
   * @response `400` `string` Bad request. Email is validated
   * @response `401` `string` Unauthorized
   * @response `403` `string` Forbidden
   * @response `404` `string` User, org or position not found
   */
  inviteEmployee = (data: InviteRequest, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/employees`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags get, organization, monitoring, Monitoring, order
   * @name GetDashboard
   * @summary Get dashboard
   * @request GET:/v1/monitoring
   * @response `200` `(DashboardOrder)[]` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found
   */
  getDashboard = (params: RequestParams = {}) =>
    this.request<DashboardOrder[], void>({
      path: `/v1/monitoring`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Method for adding, removing employees from task and comment editing. Please send only new added or deleted employees' ids in List. Can not add to order with PENDING and COMPLETED status. Send empty list if just updating comment
   *
   * @tags organization, monitoring, employee, put, Monitoring, order
   * @name UpdateTask
   * @summary Update task
   * @request PUT:/v1/monitoring
   * @response `200` `string` Success
   * @response `400` `string` Bad request
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` User, employee, org or task not found
   */
  updateTask = (data: UpdateTaskRequest, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/monitoring`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags get, organization, monitoring, Monitoring, order
   * @name GetOrder
   * @summary Get order
   * @request GET:/v1/monitoring/{orderId}
   * @response `200` `MonitoringOrder` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden (not order of organization)
   * @response `404` `void` Not found
   */
  getOrder = (orderId: number, params: RequestParams = {}) =>
    this.request<MonitoringOrder, void>({
      path: `/v1/monitoring/${orderId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags organization, monitoring, put, Monitoring, order
   * @name ChangeStatus
   * @summary Change status
   * @request PUT:/v1/monitoring/{orderId}
   * @response `200` `string` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` Forbidden (not order of organization)
   * @response `404` `void` Not found
   */
  changeStatus = (orderId: number, data: string, params: RequestParams = {}) =>
    this.request<string, void>({
      path: `/v1/monitoring/${orderId}`,
      method: 'PUT',
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Deletes task (order) by id if user has permission
   *
   * @tags task, organization, monitoring, delete, Monitoring, order
   * @name DeleteTask
   * @summary Delete task
   * @request DELETE:/v1/monitoring/{orderId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` Task not found
   */
  deleteTask = (orderId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/monitoring/${orderId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description Get order or product by id
   *
   * @tags market, product, Marketplace, get, advertisement, order
   * @name GetAd
   * @summary Get one ad
   * @request GET:/v1/market/{advertisementId}
   * @response `200` `(FullProductCard | FullOrderCard)` Success
   * @response `404` `void` Ad not found
   */
  getAd = (advertisementId: number, params: RequestParams = {}) =>
    this.request<FullProductCard | FullOrderCard, void>({
      path: `/v1/market/${advertisementId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Accept order by it's id
   *
   * @tags market, Marketplace, put, order
   * @name AcceptOrder
   * @summary Accept order
   * @request PUT:/v1/market/{advertisementId}
   * @response `200` `string` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found
   * @response `410` `void` Already accepted
   */
  acceptOrder = (advertisementId: number, params: RequestParams = {}) =>
    this.request<string, void>({
      path: `/v1/market/${advertisementId}`,
      method: 'PUT',
      ...params,
    });
  /**
   * @description Buy a product by ad id
   *
   * @tags market, product, Marketplace, post
   * @name PurchaseProduct
   * @summary Purchase product
   * @request POST:/v1/market/{advertisementId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `404` `string` Not found
   * @response `410` `string` Already purchased
   */
  purchaseProduct = (advertisementId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/market/${advertisementId}`,
      method: 'POST',
      ...params,
    });
  /**
   * @description Returns basic information about the user and avatar
   *
   * @tags Account, get, profile, user, account
   * @name GetProfile
   * @summary Get own profile
   * @request GET:/v1/account/profile
   * @response `200` `Profile` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Profile not found
   */
  getProfile = (params: RequestParams = {}) =>
    this.request<Profile, void>({
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
   * @name GetAds1
   * @summary Get all ads
   * @request GET:/v1/account/advertisements
   * @response `200` `(Order | Product)` Success
   * @response `400` `void` Bad request param
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  getAds1 = (
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
    this.request<Order | Product, void>({
      path: `/v1/account/advertisements`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description EP for updating an advertisement. Send date as string format: yyyy-MM-dd
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
   * @description Get orders and products by mandatory "type" param
   *
   * @tags market, product, Marketplace, get, advertisement, order
   * @name GetAds
   * @summary Get ads
   * @request GET:/v1/market
   * @response `200` `PageCard` Success
   * @response `400` `void` Bad param
   */
  getAds = (
    query: {
      /** products or orders */
      type: any;
      /** default 0 */
      page?: any;
      /** default 10 */
      size?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageCard, void>({
      path: `/v1/market`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Create Order or Product. Send date as string format: yyyy-MM-dd
   *
   * @tags market, product, Marketplace, post, order
   * @name PlaceAdvertisement
   * @summary Place advertisement
   * @request POST:/v1/market
   * @response `201` `string` Ad created
   * @response `400` `void` Bad request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  placeAdvertisement = (
    data: {
      dto: CreateAdRequest;
      images?: File[];
    },
    // data: FormData,
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/market`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
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
   * @response `404` `void` User not found
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
   * @response `404` `void` User not found
   */
  resend = (data: string, params: RequestParams = {}) =>
    this.request<string, void>({
      path: `/v1/auth/resend-verification`,
      method: 'POST',
      body: data,
      type: ContentType.Text,
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
  register = (
    data: RegistrationRequest,
    query?: {
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string>({
      path: `/v1/auth/registration`,
      method: 'POST',
      query: query,
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
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Endpoint for pre-submit checking of available phone. True if available
   *
   * @tags post, Authentication, authentication
   * @name IsPhoneAvailable
   * @summary Check phone availability
   * @request POST:/v1/auth/phone-available
   * @response `200` `boolean` Returns true or false
   */
  isPhoneAvailable = (data: string, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/v1/auth/phone-available`,
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
   * @description EP for sending verification code to email
   *
   * @tags post, Authentication, authentication
   * @name Login
   * @summary Login
   * @request POST:/v1/auth/login
   * @response `200` `string` Email sent
   * @response `400` `string` Bad email
   * @response `401` `string` User is not enabled (email not verified)
   * @response `404` `void` User not found
   */
  login = (
    data: string,
    query?: {
      code?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string | void>({
      path: `/v1/auth/login`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Endpoint for pre-submit checking of available email. True if available
   *
   * @tags post, Authentication, authentication
   * @name IsEmailAvailable
   * @summary Check email availability
   * @request POST:/v1/auth/email-available
   * @response `200` `boolean` Returns true or false
   */
  isEmailAvailable = (data: string, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/v1/auth/email-available`,
      method: 'POST',
      body: data,
      type: ContentType.Text,
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
    data: {
      /** @format binary */
      avatar: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/account/profile/avatar`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description Retrieve all active or completed orders of author. Sort by fields of object. Default sorting by deadlineAt
   *
   * @tags My Orders, get, account, order
   * @name GetOrders1
   * @summary Get orders
   * @request GET:/v1/account/orders
   * @response `200` `PageSmallOrder` Success
   * @response `400` `void` Bad param
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  getOrders1 = (
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
    this.request<PageSmallOrder, void>({
      path: `/v1/account/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description User confirms accepting Org's request
   *
   * @tags post, My Orders, account, order
   * @name ConfirmOrder
   * @summary Confirm order
   * @request POST:/v1/account/orders
   * @response `200` `string` Order confirmed
   * @response `401` `void` Unauthorized
   * @response `403` `void` It's not user's order
   * @response `404` `void` Order or org not found
   * @response `410` `void` Link is expired
   */
  confirmOrder = (
    query: {
      /** Code for confirming acceptance request */
      c: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/account/orders`,
      method: 'POST',
      query: query,
      ...params,
    });
  /**
   * @description Public endpoint
   *
   * @tags get, organization
   * @name GetAllOrganizations
   * @summary Get all organizations
   * @request GET:/v1/organizations
   * @response `200` `PageOrganizationSummary` Organizations paged list
   */
  getAllOrganizations = (
    query: {
      /** default 0 */
      page?: any;
      /** default 10 */
      size?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageOrganizationSummary, any>({
      path: `/v1/organizations`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Public endpoint
   *
   * @tags get, organization
   * @name GetOrganizationById
   * @summary Get organization by id
   * @request GET:/v1/organizations/{organizationId}
   * @response `200` `Organization` Success
   * @response `404` `void` Not found
   */
  getOrganizationById = (organizationId: number, params: RequestParams = {}) =>
    this.request<Organization, void>({
      path: `/v1/organizations/${organizationId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get position by id
   *
   * @tags Organization, organization, get, position, employee
   * @name GetOnePosition
   * @summary Get position
   * @request GET:/v1/organization/positions/{positionId}
   * @response `200` `PositionDto` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` No permission
   * @response `404` `void` User, position or organization not found
   */
  getOnePosition = (positionId: number, params: RequestParams = {}) =>
    this.request<PositionDto, void>({
      path: `/v1/organization/positions/${positionId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, organization, position, delete
   * @name DeletePosition
   * @summary Delete position
   * @request DELETE:/v1/organization/positions/{positionId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` Position not found
   */
  deletePosition = (positionId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/positions/${positionId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description Get a list of positions to which user can invite. Drop down request
   *
   * @tags Organization, organization, get, position, employee, account
   * @name GetPositionsDropdown
   * @summary Positions dropdown in invite
   * @request GET:/v1/organization/positions-dropdown
   * @response `200` `(PositionSummary)[]` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` No permission
   * @response `404` `void` User or organization not found
   */
  getPositionsDropdown = (params: RequestParams = {}) =>
    this.request<PositionSummary[], void>({
      path: `/v1/organization/positions-dropdown`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get all orders of organization
   *
   * @tags Organization, organization, get, monitoring, order
   * @name GetOrders
   * @summary Get order history
   * @request GET:/v1/organization/orders
   * @response `200` `PageOrderSummary` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getOrders = (
    query: {
      /** true, null or false */
      active?: any;
      /** accepted, deadline, completed */
      dateType?: any;
      /** If dateType is not null, then dateFrom is required */
      dateFrom?: any;
      /** If dateType is not null, then dateTo is required */
      dateTo?: any;
      /** Page number. Default 0 */
      page?: any;
      /** Page size. Default 6 */
      size?: any;
      /** Sorting property. Equals to object field. Can be multiplesorting properties. Default "acceptedAt" */
      '[sort]'?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageOrderSummary, void>({
      path: `/v1/organization/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Get employee and paged list of orders
   *
   * @tags Organization, get, organization, employee
   * @name GetEmployee
   * @summary Get one employee
   * @request GET:/v1/organization/employees/{employeeId}
   * @response `200` `EmployeeTasksResponse` Success
   * @response `400` `EmployeeTasksResponse` Bad param
   * @response `401` `EmployeeTasksResponse` Unauthorized
   * @response `404` `EmployeeTasksResponse` Employee not found
   */
  getEmployee = (
    employeeId: number,
    query: {
      /** Page number. Default 0 */
      page?: any;
      /** Page size. Default 10 */
      size?: any;
      /** true or false, default true. Returns nested paged list of orders */
      active?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<EmployeeTasksResponse, EmployeeTasksResponse>({
      path: `/v1/organization/employees/${employeeId}`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, organization, employee, delete
   * @name DeleteEmployee
   * @summary Delete employee
   * @request DELETE:/v1/organization/employees/{employeeId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` Employee not found
   */
  deleteEmployee = (employeeId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/employees/${employeeId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description Get all orders of organization
   *
   * @tags organization, get, monitoring, Monitoring, order
   * @name GetOrdersHistory
   * @summary Get order history
   * @request GET:/v1/monitoring/orders
   * @response `200` `PageOrderSummary` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getOrdersHistory = (
    query: {
      /** true, null or false */
      active?: any;
      /** accepted, deadline, completed */
      dateType?: any;
      /** If dateType is not null, then dateFrom is required */
      dateFrom?: any;
      /** If dateType is not null, then dateTo is required */
      dateTo?: any;
      /** Page number. Default 0 */
      page?: any;
      /** Page size. Default 6 */
      size?: any;
      /** Sorting property. Equals to object field. Can be multiplesorting properties. Default "acceptedAt" */
      '[sort]'?: any;
      params: Record<string, string>;
    },
    params: RequestParams = {},
  ) =>
    this.request<PageOrderSummary, void>({
      path: `/v1/monitoring/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Returns products purchased by user, id of product replaced by purchase id
   *
   * @tags product, get, purchase, Purchases, user, account
   * @name GetPurchases
   * @summary All purchases
   * @request GET:/v1/account/purchases
   * @response `200` `PageCard` Success
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
    this.request<PageCard, void>({
      path: `/v1/account/purchases`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Get one product ad by unique id of purchase
   *
   * @tags product, get, purchase, Purchases, user, account
   * @name GetPurchase
   * @summary One purchase
   * @request GET:/v1/account/purchases/{productId}
   * @response `200` `FullProductCard` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Card not found
   */
  getPurchase = (productId: number, params: RequestParams = {}) =>
    this.request<FullProductCard, void>({
      path: `/v1/account/purchases/${productId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Retrieve one order by id
   *
   * @tags My Orders, get, account, order
   * @name GetOrder1
   * @summary Get order
   * @request GET:/v1/account/orders/{orderId}
   * @response `200` `OrderDto` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Order not found
   */
  getOrder1 = (orderId: number, params: RequestParams = {}) =>
    this.request<OrderDto, void>({
      path: `/v1/account/orders/${orderId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Returns status or product that belongs to user, distinguish by "orderId" and "productId" field of object
   *
   * @tags get, advertisement, My Advertisements, user, account
   * @name GetAd1
   * @summary Get one ad
   * @request GET:/v1/account/advertisements/{advertisementId}
   * @response `200` `(FullOrder | FullProduct)` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  getAd1 = (advertisementId: number, params: RequestParams = {}) =>
    this.request<FullOrder | FullProduct, void>({
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
