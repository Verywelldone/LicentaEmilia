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
 *//* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ProductCategory} from '../model/productCategory';
import {ProductItem} from '../model/productItem';

import {BASE_PATH} from '../variables';
import {Configuration} from '../configuration';


@Injectable()
export class ProductControllerService {

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  protected basePath = 'http://localhost:8080';

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


  /**
   * addProduct
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
    public addProductUsingPOST(body?: ProductItem, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public addProductUsingPOST(body?: ProductItem, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public addProductUsingPOST(body?: ProductItem, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public addProductUsingPOST(body?: ProductItem, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
        '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
        headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
        'application/json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
        headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      console.log("Add Product Method called")
      return this.httpClient.request<string>('post', `${this.basePath}/api/products/add`,
        {
          body: body,
          withCredentials: this.configuration.withCredentials,
          headers: headers,
          observe: observe,
          reportProgress: reportProgress
        }
      );
    }

    /**
     * deleteProduct
     *
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteProductUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public deleteProductUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public deleteProductUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public deleteProductUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteProductUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<string>('delete',`${this.basePath}/api/products/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

  /**
   * getAllProductsByCategory
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
    public getAllProductsByCategoryUsingPOST(body?: ProductCategory, observe?: 'body', reportProgress?: boolean): Observable<Array<ProductItem>>;
    public getAllProductsByCategoryUsingPOST(body?: ProductCategory, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProductItem>>>;
    public getAllProductsByCategoryUsingPOST(body?: ProductCategory, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProductItem>>>;
    public getAllProductsByCategoryUsingPOST(body?: ProductCategory, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Array<ProductItem>>('post',`${this.basePath}/api/products/getByProductCategory`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getAllProducts
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllProductsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<ProductItem>>;
    public getAllProductsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProductItem>>>;
    public getAllProductsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProductItem>>>;
    public getAllProductsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<ProductItem>>('get',`${this.basePath}/api/products/all`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getProductById
     *
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProductByIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<ProductItem>;
    public getProductByIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductItem>>;
    public getProductByIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductItem>>;
    public getProductByIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProductByIdUsingGET.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<ProductItem>('get',`${this.basePath}/api/products/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getRandomProducts
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRandomProductsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<ProductItem>>;
    public getRandomProductsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProductItem>>>;
    public getRandomProductsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProductItem>>>;
    public getRandomProductsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<ProductItem>>('get',`${this.basePath}/api/products/recommended`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

  /**
   * updateProduct
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
    public updateProductUsingPUT(body?: ProductItem, observe?: 'body', reportProgress?: boolean): Observable<ProductItem>;
    public updateProductUsingPUT(body?: ProductItem, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductItem>>;
    public updateProductUsingPUT(body?: ProductItem, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductItem>>;
    public updateProductUsingPUT(body?: ProductItem, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<ProductItem>('put',`${this.basePath}/api/products`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
