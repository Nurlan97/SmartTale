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

import { HttpClient, RequestParams } from './http-client';

export class MyApi<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Detailed documentation of WebSocket message formats and channels
   *
   * @tags websocket, Web Socket API
   * @name WsDocumentation
   * @summary WebSocket Documentation
   * @request GET:/ws-documentation
   * @response `200` `string` OK
   */
  wsDocumentation = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/ws-documentation`,
      method: 'GET',
      ...params,
    });
}
