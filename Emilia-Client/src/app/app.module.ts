import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/auth/login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './components/auth/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {CardModule} from "primeng/card";
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {TabViewModule} from "primeng/tabview";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ModalModule} from 'ngx-bootstrap/modal';
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {MaterialExampleModule} from "./helpers/material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductCardComponent} from './components/home/product-card/product-card.component';
import {BasketComponent} from './components/user/basket/basket.component';
import {ProductComponent} from './components/admin/product/product.component';
import {CategoryComponent} from './components/admin/category/category.component';
import {AddCategoryComponent} from './components/admin/category/add-category/add-category.component';
import {ProductTableComponent} from './components/admin/product/product-table/product-table.component';
import {MatNativeDateModule} from "@angular/material/core";
import {SidebarModule} from "primeng/sidebar";
import {HeaderComponent} from './components/shared/header/header.component';
import {RecommendedProductsComponent} from './components/home/recommended-products/recommended-products.component';
import {CarouselModule} from "primeng/carousel";
import {ProductPageComponent} from './components/home/product-page/product-page.component';
import {InputNumberModule} from "primeng/inputnumber";
import {AccordionModule} from "primeng/accordion";
import {CartComponent} from './components/user/cart/cart.component';
import {AddProductModalComponent} from "./components/admin/product/add-product-modal/add-product-modal.component";
import {CategoryPageComponent} from './components/user/category-page/category-page.component';
import {ModeratorComponent} from './components/moderator/moderator.component';
import {MaterialModule} from "./material-module";
import {AuthInterceptor} from "./services/auth.interceptor";
import {BadgeModule} from "primeng/badge";
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    ProductCardComponent,
    BasketComponent,
    ProductComponent,
    AddProductModalComponent,
    CategoryComponent,
    AddCategoryComponent,
    ProductTableComponent,
    HeaderComponent,
    RecommendedProductsComponent,
    ProductPageComponent,
    CartComponent,
    CategoryPageComponent,
    ModeratorComponent
  ],
  imports: [
    MaterialExampleModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    HttpClientModule,
    StyleClassModule,
    CardModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    FileUploadModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    DropdownModule,
    CalendarModule,
    MatNativeDateModule,
    SidebarModule,
    CarouselModule,
    InputNumberModule,
    AccordionModule,
    MaterialModule,
    BadgeModule,
    DividerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
