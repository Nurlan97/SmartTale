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

export interface UpdateJobRequest {
  /** @format int64 */
  jobId: number;
  title: string;
  description: string;
  imageOperations?: ImageOperation[];
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
  /** @format int64 */
  positionId: number;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'TEMPORARY';
  location: string;
  salary?: number;
  /** @format date */
  applicationDeadline?: string;
}

export interface UpdateTaskRequest {
  /** @format int64 */
  taskId: number;
  addedEmployees: number[];
  removedEmployees: number[];
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
  visibleContacts: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
  valid?: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  /** @format int64 */
  organizationId: number;
  organizationName: string;
  organizationLogoUrl: string;
  position: string;
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
  /** @format date */
  registeredAt: string;
  /** @format date */
  subscriptionEndDate?: string;
}

export interface UpdateProductRequest {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  /** @format int32 */
  quantity: number;
  price: number;
  imageOperations?: ImageOperation[];
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface UpdateOrderRequest {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadlineAt?: string;
  imageOperations?: ImageOperation[];
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface InviteUserRequest {
  /** @format int64 */
  inviteeId: number;
  /** @format int64 */
  positionId: number;
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

export interface CreateProductRequest {
  title: string;
  description: string;
  /** @format int32 */
  quantity: number;
  price: number;
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface CreateOrderRequest {
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadline?: string;
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
}

export interface CreateJobRequest {
  /** @format int64 */
  positionId: number;
  title: string;
  description: string;
  salary?: number;
  /** @format date */
  applicationDeadline?: string;
  contactInfo: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'TEMPORARY';
  location: string;
}

export interface VerificationRequest {
  email: string;
  code: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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

export interface CustomPageUserSummary {
  content: UserSummary[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface UserSummary {
  /** @format int64 */
  userId: number;
  name: string;
  avatarUrl: string;
  /** @format int64 */
  organizationId: number;
  organizationName: string;
  organizationLogoUrl: string;
  isSubscribed: boolean;
}

export interface UserDto {
  /** @format int64 */
  userId: number;
  name: string;
  avatarUrl: string;
  /** @format int64 */
  organizationId: number;
  organizationName: string;
  organizationLogoUrl: string;
  position: string;
  email: string;
  phoneNumber: string;
  /** @format date */
  registeredAt: string;
  isSubscribed: boolean;
  canInvite: boolean;
}

export interface CustomPageSearchItem {
  content: SearchItem[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface SearchItem {
  /** @format int64 */
  id: number;
  type:
    | 'ADVERTISEMENT'
    | 'MY_ADVERTISEMENT'
    | 'PRODUCT'
    | 'MY_PRODUCT'
    | 'ORDER'
    | 'MY_ORDER'
    | 'ORG_ORDER'
    | 'ORGANIZATION'
    | 'USER'
    | 'EMPLOYEE'
    | 'PURCHASE';
  title: string;
  imageUrl: string;
}

export interface CustomPageOrganizationSummary {
  content: OrganizationSummary[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface OrganizationSummary {
  /** @format int64 */
  organizationId: number;
  name: string;
  logoUrl: string;
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

export interface CustomPageOrderAccepted {
  content: OrderAccepted[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface OrderAccepted {
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

export interface CustomPageInviterInvitation {
  content: InviterInvitation[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface InviterInvitation {
  /** @format int64 */
  invitationId: number;
  /** @format int64 */
  inviteeId: number;
  inviteeName: string;
  inviteeEmail: string;
  /** @format int64 */
  positionId: number;
  position: string;
  /** @format date-time */
  invitedAt: string;
  /** @format date-time */
  expiresAt: string;
}

export interface CustomPageEmployee {
  content: Employee[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface Employee {
  /** @format int64 */
  employeeId: number;
  name: string;
  email: string;
  orderList: OrderAccepted[];
  position: string;
  /** @format int32 */
  hierarchy: number;
  status: string;
}

export interface AssignedEmployee {
  /** @format int64 */
  userId: number;
  name: string;
  avatarUrl: string;
  reward: number;
  /** @format int32 */
  hierarchy: number;
}

export interface EmployeeDto {
  /** @format int64 */
  employeeId: number;
  name: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  position: string;
  /** @format int32 */
  hierarchy: number;
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
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
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

export interface CustomPageJobSummary {
  content: JobSummary[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface JobSummary {
  /** @format int64 */
  jobId?: number;
  /** @format date-time */
  publishedAt?: string;
  title?: string;
  description?: string;
  jobType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'TEMPORARY';
  salary?: number;
  image?: string;
  /** @format int32 */
  applicantsCount?: number;
  isClosed?: boolean;
}

export interface Job {
  /** @format int64 */
  jobId: number;
  /** @format date-time */
  publishedAt: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  title: string;
  /** @format int64 */
  positionId: number;
  position: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'TEMPORARY';
  location: string;
  salary: number;
  description: string;
  images: string[];
  jobApplications: JobApplication[];
  /** @format date */
  applicationDeadline?: string;
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
  canModify: boolean;
}

export interface JobApplication {
  /** @format int64 */
  applicationId: number;
  /** @format date-time */
  applicationDate: string;
  /** @format int64 */
  applicantId: number;
  applicantName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
}

export interface OrderDashboard {
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
  key: string;
  comment: string;
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

export interface EmployeeSummary {
  /** @format int64 */
  employeeId: number;
  employeeName: string;
  position: string;
}

export interface Card {
  /** @format int64 */
  advertisementId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  canHandle: boolean;
}

export interface CustomPageCard {
  content: Card[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface ProductCard {
  /** @format int64 */
  productId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price: number;
  /** @format int32 */
  quantity: number;
  imageUrls: string[];
  /** @format date-time */
  purchasedAt: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  /** @format int64 */
  views: number;
  canPurchase: boolean;
}

export interface OrderCard {
  /** @format int64 */
  orderId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  size: string;
  /** @format date */
  deadlineAt?: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  /** @format int64 */
  views: number;
  canAccept: boolean;
}

export interface JobCard {
  jobId: number;
  publishedAt: string;
  title: string;
  description: string;
  salary: number;
  imageUrls: string[];
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  organizationId: number;
  organizationName: string;
  organizationLogoUrl: string;
  jobType: string;
  applicantsCount: 0;
  location: string;
  applicationDeadline: string;
  views: number;
  canApply: boolean;
}

export interface CustomPagePurchaseSummary {
  content: PurchaseSummary[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface PurchaseSummary {
  /** @format int64 */
  purchaseId: number;
  /** @format date-time */
  purchasedAt: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' | 'RETURNED';
  /** @format int64 */
  productId: number;
  title: string;
  description: string;
  totalPrice: number;
  imageUrl: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  canRepeatPurchase: boolean;
}

export interface Purchase {
  /** @format int64 */
  purchaseId: number;
  /** @format date-time */
  purchasedAt: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELED' | 'RETURNED';
  /** @format date-time */
  statusDate: string;
  /** @format int64 */
  productId: number;
  title: string;
  description: string;
  /** @format int32 */
  quantity: number;
  price: number;
  totalPrice: number;
  imageUrl: string;
  /** @format int64 */
  publishedBy: number;
  publisherName: string;
  publisherAvatarUrl: string;
  publisherPhoneNumber: string;
  publisherEmail: string;
  canRepeatPurchase: boolean;
}

export interface CustomPageInvitation {
  content: Invitation[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface Invitation {
  /** @format int64 */
  invitationId: number;
  /** @format int64 */
  orgId: number;
  orgName: string;
  orgLogoUrl: string;
  position: string;
  /** @format date-time */
  invitedAt: string;
}

export interface CustomPageSmallOrder {
  content: SmallOrder[];
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
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

export interface OrderSummaryPersonal {
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
  isClosed: boolean;
}

export interface Product {
  /** @format int64 */
  productId: number;
  title: string;
  description: string;
  price: number;
  /** @format int32 */
  quantity: number;
  imageUrl: string;
  /** @format date-time */
  publishedAt: string;
  isClosed: boolean;
}

export interface CustomPage {
  content: Array<OrderSummaryPersonal | Product>;
  /** @format int32 */
  totalPages: number;
  /** @format int64 */
  totalElements: number;
  /** @format int32 */
  number: number;
  /** @format int32 */
  size: number;
  isEmpty: boolean;
}

export interface AcceptanceRequest {
  /** @format int64 */
  organizationId: number;
  name: string;
  logoUrl: string;
  code: string;
  /** @format date */
  requestedAt: string;
}

export interface OrderFull {
  /** @format int64 */
  orderId: number;
  /** @format date-time */
  publishedAt: string;
  /** @format date */
  acceptedAt?: string;
  /** @format int64 */
  acceptedBy: number;
  acceptanceRequests: AcceptanceRequest[];
  organizationName: string;
  organizationLogoUrl: string;
  title: string;
  description: string;
  price: number;
  size: string;
  /** @format date */
  deadlineAt?: string;
  imageUrls: string[];
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
}

export interface ProductFull {
  /** @format int64 */
  productId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price: number;
  /** @format int32 */
  quantity: number;
  imageUrls: string[];
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
}
