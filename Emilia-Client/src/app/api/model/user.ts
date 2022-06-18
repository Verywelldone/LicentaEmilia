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
import { ProductItem } from './productItem';
import { Role } from './role';
import { UserInfo } from './userInfo';

export interface User { 
    accountAvailable?: boolean;
    createdAt?: string;
    email: string;
    favoriteProductItems?: Array<ProductItem>;
    id?: number;
    lastLogin?: string;
    orderList?: Array<Order>;
    password: string;
    roles?: Array<Role>;
    userInfo?: UserInfo;
    username: string;
}