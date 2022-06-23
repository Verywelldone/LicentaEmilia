export * from './adminController.service';
import { AdminControllerService } from './adminController.service';
export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './imageUploadController.service';
import { ImageUploadControllerService } from './imageUploadController.service';
export * from './orderController.service';
import { OrderControllerService } from './orderController.service';
export * from './productCategoryController.service';
import { ProductCategoryControllerService } from './productCategoryController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './ratingController.service';
import { RatingControllerService } from './ratingController.service';
export * from './testController.service';
import { TestControllerService } from './testController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AdminControllerService, AuthControllerService, BasicErrorControllerService, ImageUploadControllerService, OrderControllerService, ProductCategoryControllerService, ProductControllerService, RatingControllerService, TestControllerService, UserControllerService];
