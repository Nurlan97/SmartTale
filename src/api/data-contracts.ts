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
  middleName: string;
  email: string;
  phoneNumber?: string;
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
}

export interface CreateAdRequest {
  type: string;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadline?: string;
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
  middleName: string;
  email: string;
  valid?: boolean;
}

export interface InviteRequest {
  email: string;
  /** @format int64 */
  positionId: number;
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
  /** @format date-time */
  date: string;
}

export interface PageCard {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
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
  publisherPhoneNumber?: string;
  publisherEmail: string;
  /** @format int64 */
  views: number;
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
  status: 'NEW' | 'IN_PROGRESS' | 'CHECKING' | 'DISPATCHED' | 'ARRIVED' | 'CANCELED';
  /** @format date */
  acceptedAt: string;
  /** @format date */
  deadlineAt?: string;
}

export interface PageCurrentOrder {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: CurrentOrder[];
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
  orderList?: CurrentOrder[];
  position: string;
  status: string;
}

export interface PageEmployee {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
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

export interface PageSmallOrder {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
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
  price?: number;
  /** @format date */
  date: string;
}

export interface OrderDto {
  /** @format int64 */
  orderId: number;
  title: string;
  description: string;
  price?: number;
  size?: string;
  /** @format date */
  deadlineAt?: string;
  imageUrls?: string[];
  /** @format int64 */
  publishedBy: number;
  publisherAvatarUrl: string;
  publisherName: string;
  publisherPhoneNumber?: string;
  publisherEmail: string;
  /** @format date */
  date: string;
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
