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
import { ProductItem } from './productItem';
import { UserInfo } from './userInfo';

export interface ServiceRatingResDTO { 
    fromUser?: UserInfo;
    message?: string;
    rateDate?: string;
    stars?: number;
    toProduct?: ProductItem;
}