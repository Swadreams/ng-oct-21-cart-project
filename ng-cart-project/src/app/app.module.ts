import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SubheaderComponent } from './components/subheader/subheader.component';
import { ProductComponent } from './components/product/product.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SummaryPipe } from './shared/summary.pipe';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { RatingsComponent } from './components/product-details/ratings/ratings.component';
import { ServicesComponent } from './components/product-details/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubheaderComponent,
    ProductComponent,
    ExamplesComponent,
    SummaryPipe,
    LoginComponent,
    SignupComponent,
    ProductDetailsComponent,
    PagenotfoundComponent,
    RatingsComponent,
    ServicesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
