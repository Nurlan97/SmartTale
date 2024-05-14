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

export interface CreateOrgRequest {
  name: string;
  description?: string;
}

export interface Position {
  /** @format int64 */
  positionId?: number;
  title: string;
  /** @format int32 */
  hierarchy: number;
  /**
   * @maxItems 2147483647
   * @minItems 1
   */
  authorities: string[];
  /** @format int64 */
  organizationId: number;
}

export interface UpdateEmployeeRequest {
  /** @format int64 */
  employeeId: number;
  /** @format int64 */
  positionId: number;
}

export interface UpdateTaskRequest {
  /** @format int64 */
  taskId: number;
  addEmployees: number[];
  removeEmployees: number[];
  comment?: string;
}

export interface UpdateProfileRequest {
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  firstName: string;
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  lastName: string;
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  middleName?: string;
  email: string;
  phoneNumber: string;
  valid?: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  /** @format date */
  subscriptionEndDate?: string;
}

export interface ImageOperation {
  /**
   * @format int32
   * @min 0
   * @max 4
   */
  arrayPosition?: number;
  /**
   * @format int32
   * @min 0
   * @max 4
   */
  targetPosition?: number;
  action: 'ADD' | 'MOVE' | 'REMOVE' | 'REPLACE';
  /**
   * @format int32
   * @min 0
   * @max 4
   */
  filePosition?: number;
}

export interface UpdateAdRequest {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadlineAt?: string;
  imageOperations?: ImageOperation[];
  contactInfo?: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface InviteRequest {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  /** @format int64 */
  positionId: number;
  name?: string;
}

export interface CreateAdRequest {
  type: string;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadline?: string;
  contactInfo?: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface VerificationRequest {
  email: string;
  code: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  /** @format int64 */
  userId: number;
  /** @format int32 */
  hierarchy: number;
  authorities: string[];
}

export interface RegistrationRequest {
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  firstName: string;
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  lastName: string;
  /** @pattern ^[\p{IsLatin}&&[^\p{IsCyrillic}]]+$|^[\p{IsCyrillic}&&[^\p{IsLatin}]]+$ */
  middleName?: string;
  email: string;
  phoneNumber: string;
  valid?: boolean;
}

export interface OrganizationSummary {
  /** @format int64 */
  organizationId: number;
  name: string;
  logoUrl: string;
}

export interface PageOrganizationSummary {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: OrganizationSummary[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface SortObject {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface Organization {
  /** @format int64 */
  organizationId: number;
  name: string;
  description: string;
  logoUrl: string;
  /** @format int64 */
  ownerId: number;
  ownerName: string;
  ownerAvatarUrl: string;
  /** @format date */
  registeredAt: string;
}

export interface PositionSummary {
  /** @format int64 */
  positionId: number;
  title: string;
}

export interface PositionDto {
  /** @format int64 */
  positionId: number;
  title: string;
  /** @format int32 */
  hierarchy: number;
  authorities: string[];
}

export interface OrderSummary {
  /** @format int64 */
  orderId: number;
  key: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format date */
  completedAt?: string;
}

export interface PageOrderSummary {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: OrderSummary[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface Employee {
  /** @format int64 */
  employeeId: number;
  name: string;
  email: string;
  orderList: OrderSummary[];
  position: string;
  status: string;
}

export interface PageEmployee {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Employee[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface AssignedEmployee {
  /** @format int64 */
  userId: number;
  name: string;
  avatarUrl: string;
  reward?: number;
}

export interface EmployeeDto {
  /** @format int64 */
  employeeId: number;
  name: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  position: string;
}

export interface EmployeeTasksResponse {
  employee: EmployeeDto;
  tasks: PageTask;
}

export interface PageTask {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Task[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface Task {
  /** @format int64 */
  orderId: number;
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  title: string;
  key: string;
  description: string;
  price: number;
  comment: string;
  /** @format date */
  date: string;
  employees: AssignedEmployee[];
  /** @format int64 */
  publisherId: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
}

export interface DashboardOrder {
  /** @format int64 */
  id: number;
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  title: string;
  key?: string;
  comment?: string;
  /** @format date */
  deadlineAt?: string;
}

export interface MonitoringOrder {
  /** @format int64 */
  orderId: number;
  /** @format date-time */
  publishedAt: string;
  /** @format date */
  acceptedAt?: string;
  /** @format date */
  deadlineAt?: string;
  key: string;
  title: string;
  description: string;
  size: string;
  imageUrls: string[];
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  /** @format int64 */
  publisherId: number;
  publisherAvatarUrl: string;
  publisherEmail: string;
  publisherPhone: string;
  employees: AssignedEmployee[];
  /** @format int64 */
  views: number;
}

export interface Card {
  /** @format int64 */
  productId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price?: number;
  imageUrl: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
}

export interface PageCard {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: Card[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface FullProductCard {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  /** @format date-time */
  publishedAt: string;
  /** @format date-time */
  purchasedAt?: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl?: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  /** @format int64 */
  views: number;
}

export interface FullOrderCard {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  price?: number;
  imageUrls: string[];
  size?: string;
  /** @format date-time */
  publishedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format int64 */
  acceptedBy: number;
  organizationName: string;
  organizationLogoUrl: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  /** @format int64 */
  views: number;
}

export interface PageSmallOrder {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: SmallOrder[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  numberOfElements?: number;
  empty?: boolean;
}

export interface SmallOrder {
  /** @format int64 */
  orderId: number;
  title: string;
  price: number;
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format date */
  completedAt?: string;
  status?:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
}

export interface OrderDto {
  /** @format int64 */
  orderId: number;
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'COMPLETED'
    | 'CANCELED';
  title: string;
  description: string;
  price: number;
  size: string;
  /** @format int64 */
  acceptedBy: number;
  organizationName: string;
  organizationLogoUrl: string;
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format date */
  completedAt?: string;
  imageUrls: string[];
}

export interface Order {
  /** @format int64 */
  orderId: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  /** @format date-time */
  publishedAt: string;
  /** @format int32 */
  acceptancesCount: number;
}

export interface Product {
  /** @format int64 */
  productId: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  /** @format date-time */
  publishedAt: string;
}

export interface AcceptanceRequestDto {
  /** @format int64 */
  organizationId: number;
  name: string;
  logoUrl: string;
  code: string;
}

export interface FullOrder {
  /** @format int64 */
  orderId: number;
  /** @format date-time */
  publishedAt: string;
  /** @format date */
  acceptedAt?: string;
  /** @format int64 */
  acceptedBy: number;
  acceptanceRequests: AcceptanceRequestDto[];
  organizationName: string;
  organizationLogoUrl: string;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadlineAt?: string;
  imageUrls: string[];
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
}

export interface FullProduct {
  /** @format int64 */
  productId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price?: number;
  imageUrls: string[];
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
}
