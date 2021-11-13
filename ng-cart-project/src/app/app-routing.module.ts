import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RatingsComponent } from './components/product-details/ratings/ratings.component';
import { ServicesComponent } from './components/product-details/services/services.component';
import { ProductComponent } from './components/product/product.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductComponent },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    children: [
      { path: 'rating', component: RatingsComponent },
      { path: 'services', component: ServicesComponent },
      { path: '', redirectTo: 'rating', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
