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
import { Order } from './order';
import { User } from './user';

export interface Customer { 
    country?: string;
    fullName?: string;
    id?: number;
    orderList?: Array<Order>;
    phone?: string;
    shippingAddress?: string;
    user?: User;
}