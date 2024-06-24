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
  CreateJobRequest,
  CreateOrderRequest,
  CreateOrgRequest,
  CreateProductRequest,
  CustomPage,
  CustomPageCard,
  CustomPageEmployee,
  CustomPageInvitation,
  CustomPageInviterInvitation,
  CustomPageJobSummary,
  CustomPageOrderAccepted,
  CustomPageOrganizationSummary,
  CustomPagePurchaseSummary,
  CustomPageSearchItem,
  CustomPageSmallOrder,
  CustomPageUserSummary,
  EmployeeSummary,
  EmployeeTasksResponse,
  InviteRequest,
  InviteUserRequest,
  Job,
  LoginResponse,
  MonitoringOrder,
  OrderCard,
  OrderDashboard,
  OrderDto,
  OrderFull,
  OrderSummaryPersonal,
  Organization,
  Position,
  PositionDto,
  PositionSummary,
  Product,
  ProductCard,
  ProductFull,
  Profile,
  Purchase,
  RegistrationRequest,
  UpdateEmployeeRequest,
  UpdateJobRequest,
  UpdateOrderRequest,
  UpdateProductRequest,
  UpdateProfileRequest,
  UpdateTaskRequest,
  UserDto,
  VerificationRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

class MyApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
   * No description
   *
   * @tags Organization
   * @name DeleteOrganization
   * @request DELETE:/v1/organization
   * @response `200` `string` OK
   */
  deleteOrganization = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/v1/organization`,
      method: 'DELETE',
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
   * @description If user did not change anything except position title, then send patch request
   *
   * @tags patch, Organization, organization, position
   * @name RenamePosition
   * @summary Rename position
   * @request PATCH:/v1/organization/positions
   * @response `200` `string` Success
   * @response `400` `string` Bad request
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` User, org or position not found
   */
  renamePosition = (data: Position, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/positions`,
      method: 'PATCH',
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
   * @response `200` `CustomPageEmployee` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getEmployees = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageEmployee, void>({
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
   * @name SendInvitation
   * @summary Send invitation
   * @request POST:/v1/organization/employees
   * @response `201` `string` Invite successful
   * @response `400` `string` Bad request. Email is validated
   * @response `401` `string` Unauthorized
   * @response `403` `string` Forbidden
   * @response `404` `string` User, org or position not found
   */
  sendInvitation = (data: InviteRequest, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/employees`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Returns all job ads of organization
   *
   * @tags Organization, get, organization, advertisement, job
   * @name GetAdvertisements
   * @summary Get job ads of organization
   * @request GET:/v1/organization/advertisements
   * @response `200` `CustomPageJobSummary` Success
   * @response `401` `CustomPageJobSummary` Unauthorized
   * @response `403` `CustomPageJobSummary` Has no EMPLOYEE role
   * @response `404` `CustomPageJobSummary` Organization not found
   */
  getAdvertisements = (
    query?: {
      /** Default 0 */
      page?: any;
      /** Default 5 */
      size?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageJobSummary, CustomPageJobSummary>({
      path: `/v1/organization/advertisements`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Organization, organization, advertisement, job, put
   * @name UpdateAdvertisement
   * @summary Update job
   * @request PUT:/v1/organization/advertisements
   * @response `200` `string` Success
   * @response `400` `string` Bad request
   * @response `401` `string` Unauthorized
   * @response `403` `string` No permission
   * @response `404` `string` Not found
   */
  updateAdvertisement = (
    data: {
      dto: UpdateJobRequest;
      images?: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string>({
      path: `/v1/organization/advertisements`,
      method: 'PUT',
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
   * @response `200` `(OrderDashboard)[]` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Not found
   */
  getDashboard = (params: RequestParams = {}) =>
    this.request<OrderDashboard[], void>({
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
   * @summary Update status
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
   * No description
   *
   * @tags Account
   * @name DeleteAccount
   * @request DELETE:/v1/account/profile
   * @response `200` `string` OK
   */
  deleteAccount = (data: string, params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/v1/account/profile`,
      method: 'DELETE',
      body: data,
      type: ContentType.Text,
      ...params,
    });
  /**
   * @description Returns orders and products that belong to user, distinguish by "orderId" and "productId" field of objects
   *
   * @tags get, advertisement, My Advertisements, user, account
   * @name GetMyAds
   * @summary Get all my ads
   * @request GET:/v1/account/advertisements
   * @response `200` `(OrderSummaryPersonal & Product & CustomPage)` Success
   * @response `400` `void` Bad request param
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  getMyAds = (
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
    this.request<OrderSummaryPersonal & Product & CustomPage, void>({
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
   * @summary Update my ad
   * @request PUT:/v1/account/advertisements
   * @response `200` `string` Success
   * @response `400` `void` Validation failed
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  updateAd = (
    data: { dto: UpdateProductRequest | UpdateOrderRequest },
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
   * No description
   *
   * @tags user, post
   * @name InviteEmployee
   * @summary Invite a user
   * @request POST:/v1/users/invite
   * @response `201` `string` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` No permission or role
   * @response `404` `void` User not found
   */
  inviteEmployee = (data: InviteUserRequest, params: RequestParams = {}) =>
    this.request<string, void>({
      path: `/v1/users/invite`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get orders, products or jobs by mandatory "type" param
   *
   * @tags market, product, Marketplace, get, jobs, advertisement, order
   * @name GetAds
   * @summary Get market ads
   * @request GET:/v1/market
   * @response `200` `CustomPageCard` Success
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageCard, void>({
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
   * @response `403` `void` Employee does not have permission to create job ad
   * @response `404` `void` User not found
   */
  placeAdvertisement = (
    data: { dto: CreateProductRequest | CreateOrderRequest | CreateJobRequest },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/market`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Get order, product or job by id
   *
   * @tags market, product, Marketplace, get, advertisement, job, order
   * @name GetAd
   * @summary Get market ad
   * @request GET:/v1/market/{advertisementId}
   * @response `200` `(ProductCard | OrderCard)` Success
   * @response `404` `void` Ad not found
   */
  getAd = (advertisementId: number, params: RequestParams = {}) =>
    this.request<ProductCard | OrderCard, void>({
      path: `/v1/market/${advertisementId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Purchase product, accept order or apply job
   *
   * @tags market, product, Marketplace, post, advertisement, job, order
   * @name HandleAdvertisementAction
   * @summary Handle advertisement
   * @request POST:/v1/market/{advertisementId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `404` `string` Not found
   * @response `410` `string` Already purchased
   */
  handleAdvertisementAction = (
    advertisementId: number,
    query?: {
      /**
       * Only used with purchase Product
       * @format int32
       */
      quantity?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, string>({
      path: `/v1/market/${advertisementId}`,
      method: 'POST',
      query: query,
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
      type: ContentType.Text,
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
      type: ContentType.Text,
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
   * No description
   *
   * @tags Account, post, invitation, account
   * @name AcceptInvitation
   * @summary Accept invitation
   * @request POST:/v1/account/profile/invitations/{invitationId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` Still has assigned tasks
   * @response `404` `string` Invitation not found or expired
   */
  acceptInvitation = (invitationId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/account/profile/invitations/${invitationId}`,
      method: 'POST',
      ...params,
    });
  /**
   * No description
   *
   * @tags Account, invitation, delete, account
   * @name DeclineInvitation
   * @summary Decline invitation
   * @request DELETE:/v1/account/profile/invitations/{invitationId}
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `404` `string` Invitation not found
   */
  declineInvitation = (invitationId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/account/profile/invitations/${invitationId}`,
      method: 'DELETE',
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
      avatar?: File;
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
   * @description Retrieve all active or completed orders of author. Sort by fields of object. Default sorting by deadlineAt
   *
   * @tags My Orders, get, account, order
   * @name GetOrders1
   * @summary Get my orders
   * @request GET:/v1/account/orders
   * @response `200` `CustomPageSmallOrder` Success
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageSmallOrder, void>({
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
      code: string;
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
   * No description
   *
   * @tags user, get
   * @name GetUsers
   * @summary Get all users
   * @request GET:/v1/users
   * @response `200` `CustomPageUserSummary` Success
   * @response `401` `void` Unauthorized
   */
  getUsers = (
    query?: {
      /**
       * Page number
       * @example 1
       */
      page?: any;
      /**
       * Page size
       * @example 1
       */
      size?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageUserSummary, void>({
      path: `/v1/users`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user, get
   * @name GetOneUser
   * @summary Get one user
   * @request GET:/v1/users/{userId}
   * @response `200` `UserDto` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User not found
   */
  getOneUser = (userId: number, params: RequestParams = {}) =>
    this.request<UserDto, void>({
      path: `/v1/users/${userId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Search by query and context aka filter. iDD stands for dropdown field
   *
   * @tags search, Search API, get
   * @name Search
   * @summary Search
   * @request GET:/v1/search
   * @response `200` `CustomPageSearchItem` Success
   * @response `400` `CustomPageSearchItem` Bad request
   * @response `401` `CustomPageSearchItem` Unauthorized
   */
  search = (
    query: {
      q: string;
      con?: string;
      /** @default true */
      iDD?: boolean;
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageSearchItem, CustomPageSearchItem>({
      path: `/v1/search`,
      method: 'GET',
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
   * @response `200` `CustomPageOrganizationSummary` Organizations paged list
   */
  getAllOrganizations = (
    query?: {
      /** default 0 */
      page?: any;
      /** default 10 */
      size?: any;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageOrganizationSummary, any>({
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
   * @description Get a list of positions to which user can invite. Drop down request. Evaluates requesting user's permissions
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
   * @response `200` `CustomPageOrderAccepted` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getOrders = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageOrderAccepted, void>({
      path: `/v1/organization/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Returns inv-s sent by current org
   *
   * @tags Organization, invitation, get, organization
   * @name GetInvitations
   * @summary Get invitations
   * @request GET:/v1/organization/invitations
   * @response `200` `CustomPageInviterInvitation` Success
   * @response `401` `CustomPageInviterInvitation` Unauthorized
   * @response `403` `CustomPageInviterInvitation` Has no role EMPLOYEE
   */
  getInvitations = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageInviterInvitation, CustomPageInviterInvitation>({
      path: `/v1/organization/invitations`,
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
    query?: {
      /** Page number. Default 0 */
      page?: any;
      /** Page size. Default 10 */
      size?: any;
      /** true or false, default true. Returns nested paged list of orders */
      active?: any;
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
   * No description
   *
   * @tags Organization, get, organization, advertisement, job
   * @name GetAdvertisement
   * @summary Get one job ad
   * @request GET:/v1/organization/advertisements/{advertisementId}
   * @response `200` `Job` Success
   * @response `401` `Job` Unauthorized
   * @response `403` `Job` User has no EMPLOYEE role
   * @response `404` `Job` Not found
   */
  getAdvertisement = (advertisementId: number, params: RequestParams = {}) =>
    this.request<Job, Job>({
      path: `/v1/organization/advertisements/${advertisementId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Get all orders of organization
   *
   * @tags organization, get, monitoring, Monitoring, order
   * @name GetOrdersHistory
   * @summary Get order history
   * @request GET:/v1/monitoring/orders
   * @response `200` `CustomPageOrderAccepted` Success
   * @response `400` `void` Bad param request
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or organization not found
   */
  getOrdersHistory = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageOrderAccepted, void>({
      path: `/v1/monitoring/orders`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Retrieve employees list whose hierarchy is lower
   *
   * @tags get, employee, monitoring, Monitoring
   * @name GetEmployeesBeforeAssign
   * @summary Get employees to assign
   * @request GET:/v1/monitoring/employees
   * @response `200` `(EmployeeSummary)[]` Success
   * @response `401` `(EmployeeSummary)[]` Unauthorized
   * @response `403` `(EmployeeSummary)[]` No permission to assign employees
   */
  getEmployeesBeforeAssign = (params: RequestParams = {}) =>
    this.request<EmployeeSummary[]>({
      path: `/v1/monitoring/employees`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Returns purchases with product in it
   *
   * @tags product, get, purchase, Purchases, user, account
   * @name GetPurchases
   * @summary All purchases
   * @request GET:/v1/account/purchases
   * @response `200` `CustomPagePurchaseSummary` Success
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
    this.request<CustomPagePurchaseSummary, void>({
      path: `/v1/account/purchases`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description Returns purchase with details and product in it
   *
   * @tags product, get, purchase, Purchases, user, account
   * @name GetPurchase
   * @summary One purchase
   * @request GET:/v1/account/purchases/{productId}
   * @response `200` `Purchase` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` Purchase not found
   */
  getPurchase = (productId: number, params: RequestParams = {}) =>
    this.request<Purchase, void>({
      path: `/v1/account/purchases/${productId}`,
      method: 'GET',
      ...params,
    });
  /**
   * No description
   *
   * @tags Account, invitation, get, account
   * @name GetInvitations1
   * @summary Get user's invitations
   * @request GET:/v1/account/profile/invitations
   * @response `200` `CustomPageInvitation` Success
   * @response `401` `CustomPageInvitation` Unauthorized
   */
  getInvitations1 = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number;
      /**
       * @format int32
       * @default 5
       */
      size?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomPageInvitation, CustomPageInvitation>({
      path: `/v1/account/profile/invitations`,
      method: 'GET',
      query: query,
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
   * @name GetMyAd
   * @summary Get one my ad
   * @request GET:/v1/account/advertisements/{advertisementId}
   * @response `200` `(OrderFull | ProductFull)` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  getMyAd = (advertisementId: number, params: RequestParams = {}) =>
    this.request<OrderFull | ProductFull, void>({
      path: `/v1/account/advertisements/${advertisementId}`,
      method: 'GET',
      ...params,
    });
  /**
   * @description Deletes sent invitation. Requires DELETE_EMPLOYEE permission
   *
   * @tags Organization, invitation, organization, delete
   * @name DeleteInvitation
   * @summary Revoke invitation
   * @request DELETE:/v1/organization/invitations/{invId}
   * @response `200` `string` Deletion success
   * @response `401` `string` Unauthorized
   * @response `403` `string` Has no permission
   * @response `404` `string` Not found or does not belong to current org
   */
  deleteInvitation = (invId: number, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/organization/invitations/${invId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description EP for close(1)/disclose(2)/delete(3) an ad
   *
   * @tags Organization, organization, advertisement, job, delete
   * @name InteractWithAd
   * @summary Interact with org ad
   * @request DELETE:/v1/organization/advertisements/{advertisementId}/{actionId}
   * @response `200` `string` Success
   * @response `401` `void` Unauthorized
   * @response `403` `void` No permission
   * @response `404` `void` User or Ad not found
   */
  interactWithAd = (
    advertisementId: number,
    actionId: string,
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/v1/organization/advertisements/${advertisementId}/${actionId}`,
      method: 'DELETE',
      ...params,
    });
  /**
   * No description
   *
   * @tags Account, organization, delete, user, account
   * @name LeaveOrganization
   * @summary Leave organization
   * @request DELETE:/v1/account/profile/organization
   * @response `200` `string` Success
   * @response `401` `string` Unauthorized
   * @response `403` `string` User is owner or has assigned tasks
   */
  leaveOrganization = (params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/v1/account/profile/organization`,
      method: 'DELETE',
      ...params,
    });
  /**
   * @description EP for close(1)/disclose(2)/delete(3) an ad
   *
   * @tags advertisement, My Advertisements, user, delete, account
   * @name InteractWithAd1
   * @summary Action on ad
   * @request DELETE:/v1/account/advertisements/{advertisementId}/{actionId}
   * @response `200` `string` Success
   * @response `401` `void` Unauthorized
   * @response `404` `void` User or Ad not found
   */
  interactWithAd1 = (
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
export const myApi = new MyApi();
