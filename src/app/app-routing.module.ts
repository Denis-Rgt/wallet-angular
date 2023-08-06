import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DepensesComponent } from './depenses/depenses.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from './auth.guard';
import { NewAccountComponent } from './new-account/new-account.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'inscription', component: NewAccountComponent},
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'depenses', component: DepensesComponent, canActivate: [AuthGuard]},
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path:'**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
