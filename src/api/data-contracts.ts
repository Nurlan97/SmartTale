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
  phoneNumber?: string;
  avatarUrl?: string;
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

export interface Organization {
  /** @format int64 */
  organizationId?: number;
  /** @format int64 */
  ownerId?: number;
  ownerName?: string;
  ownerAvatarUrl?: string;
  organizationName?: string;
  description?: string;
  /** @format date */
  registeredAt?: string;
  logoUrl?: string;
}

export interface Position {
  /** @format int64 */
  positionId: number;
  title: string;
}

export interface CurrentOrder {
  /** @format int64 */
  orderId: number;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  status:
    | 'PENDING'
    | 'NEW'
    | 'IN_PROGRESS'
    | 'CHECKING'
    | 'DISPATCHED'
    | 'ARRIVED'
    | 'DONE'
    | 'CANCELED';
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
}

export interface PageCurrentOrder {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: CurrentOrder[];
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

export interface Employee {
  /** @format int64 */
  employeeId: number;
  name: string;
  email: string;
  orderList?: CurrentOrder[];
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
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface Card {
  /** @format int64 */
  productId: number;
  /** @format date-time */
  publishedAt: string;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  /** @format int64 */
  publishedBy: number;
  publisherAvatarUrl?: string;
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
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface FullProductCard {
  /** @format int64 */
  advertisementId: number;
  title: string;
  description: string;
  price: number;
  imageUrls?: string[];
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
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface SmallOrder {
  /** @format int64 */
  orderId: number;
  title: string;
  price?: number;
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format date */
  completedAt?: string;
  status?: string;
}

export interface OrderDto {
  /** @format int64 */
  orderId: number;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format int64 */
  acceptedBy: number;
  acceptorName: string;
  acceptorLogoUrl?: string;
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
  /** @format date */
  completedAt?: string;
  imageUrls?: string[];
}

export interface Product {
  /** @format int64 */
  productId: number;
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  /** @format date-time */
  publishedAt: string;
}

export interface FullOrder {
  /** @format int64 */
  orderId: number;
  /** @format date-time */
  publishedAt: string;
  /** @format int64 */
  publishedBy: number;
  /** @format date */
  acceptedAt?: string;
  /** @format int64 */
  acceptedBy?: number;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadlineAt?: string;
  imageUrls?: string[];
  /** @format int64 */
  views: number;
  isDeleted: boolean;
  isClosed: boolean;
}
