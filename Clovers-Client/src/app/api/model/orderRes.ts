/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { OrderProductRes } from './orderProductRes';

export interface OrderRes { 
    dateCreated?: string;
    id?: number;
    numberOfProducts?: number;
    orderProducts?: Array<OrderProductRes>;
    orderStatus?: OrderRes.OrderStatusEnum;
    totalOrderPrice?: number;
}
export namespace OrderRes {
    export type OrderStatusEnum = 'CANCELED' | 'DELIVERED' | 'PENDING' | 'SENT';
    export const OrderStatusEnum = {
        CANCELED: 'CANCELED' as OrderStatusEnum,
        DELIVERED: 'DELIVERED' as OrderStatusEnum,
        PENDING: 'PENDING' as OrderStatusEnum,
        SENT: 'SENT' as OrderStatusEnum
    };
}