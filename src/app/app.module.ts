import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule} from '@auth0/angular-jwt';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepensesComponent } from './depenses/depenses.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewDepenseComponent } from './new-depense/new-depense.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditDepenseComponent } from './edit-depense/edit-depense.component';
import { FilterPipe } from './depenses/filter.pipe';
import { NewAccountComponent } from './new-account/new-account.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DepensesComponent,
    CategoriesComponent,
    NewDepenseComponent,
    EditDepenseComponent,
    FilterPipe,
    NewAccountComponent,
    NewCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
          },
        }
    }),
    MatDialogModule,
    BrowserAnimationsModule
  ],exports: [FilterPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
