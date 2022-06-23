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
import {FooterComponent} from './components/shared/footer/footer.component';
import {GMapModule} from "primeng/gmap";
import {InputSwitchModule} from "primeng/inputswitch";
import {StepsModule} from "primeng/steps";
import {AgmCoreModule} from "@agm/core";
import {FavoritesComponent} from './components/user/favorites/favorites.component';
import {UserProfileComponent} from './components/user/user-profille/user-profile.component';
import {ProfileInfoComponent} from './components/user/user-profille/profile-info/profile-info.component';
import {OrderInfoComponent} from './components/user/user-profille/order-info/order-info.component';
import {OrderStatusComponent} from './components/user/user-profille/order-info/order-status/order-status.component';
import {OrderActionsComponent} from './components/user/user-profille/order-info/order-actions/order-actions.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SpinnerComponent} from './components/shared/spinner/spinner.component';
import {MaintainCategoriesComponent} from './components/moderator/maintain-categories/maintain-categories.component';
import {MaintainCategoriesTableComponent} from './components/moderator/maintain-categories/maintain-categories-table/maintain-categories-table.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {RadioButtonModule} from "primeng/radiobutton";
import {PasswordModule} from "primeng/password";
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {GestionerComponent} from './components/gestioner/gestioner.component';
import {AllUserOrdersComponent} from './components/moderator/all-user-orders/all-user-orders.component';
import {FilteredOrdersComponent} from './components/moderator/filtered-orders/filtered-orders.component';
import { RatingSectionComponent } from './components/shared/rating-section/rating-section.component';
import {RatingModule} from "primeng/rating";

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
    ModeratorComponent,
    FooterComponent,
    FavoritesComponent,
    UserProfileComponent,
    ProfileInfoComponent,
    OrderInfoComponent,
    OrderStatusComponent,
    OrderActionsComponent,
    SpinnerComponent,
    MaintainCategoriesComponent,
    MaintainCategoriesTableComponent,
    GestionerComponent,
    AllUserOrdersComponent,
    FilteredOrdersComponent,
    RatingSectionComponent
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
        DividerModule,
        GMapModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAeneTFMwiJ9Sbjn3Gmvvk9KQjj0Eh_eGs'
        }), GMapModule, StepsModule, AccordionModule, InputSwitchModule, DividerModule, ProgressSpinnerModule, MessageModule, RadioButtonModule, PasswordModule, MatPasswordStrengthModule, RatingModule
    ],
  providers: [
    ConfirmationService, MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
