import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {UserComponent} from "./components/user/user.component";
import {AdminComponent} from "./components/admin/admin.component";
import {BasketComponent} from "./components/user/basket/basket.component";
import {ProductPageComponent} from "./components/home/product-page/product-page.component";
import {CategoryPageComponent} from "./components/user/category-page/category-page.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'profile', component: ProfileComponent},


  {path: 'user', component: UserComponent},
  {path: 'basket', component: BasketComponent},
  // {path: 'mod', component: BoardModeratorComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home/product/:productId', component: ProductPageComponent},
  {path: 'home/category/:categoryId', component: CategoryPageComponent},
  {path: 'home/category/:categoryId/product/:productId', component: ProductPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
