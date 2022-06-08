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
import { OrderProduct } from './orderProduct';

export interface Order { 
    dateCreated?: string;
    id?: number;
    numberOfProducts?: number;
    orderProducts?: Array<OrderProduct>;
    orderStatus?: Order.OrderStatusEnum;
    totalOrderPrice?: number;
}
export namespace Order {
    export type OrderStatusEnum = 'CANCELED' | 'DELIVERED' | 'PENDING' | 'SENT';
    export const OrderStatusEnum = {
        CANCELED: 'CANCELED' as OrderStatusEnum,
        DELIVERED: 'DELIVERED' as OrderStatusEnum,
        PENDING: 'PENDING' as OrderStatusEnum,
        SENT: 'SENT' as OrderStatusEnum
    };
}