import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminPagesComponent } from './components/admin-pages/admin-pages.component';
import { AdminAddPageComponent } from './components/admin-add-page/admin-add-page.component';
import { AdminEditPageComponent } from './components/admin-edit-page/admin-edit-page.component';

import { PageService } from './services/page.service';
import { UserService } from './services/user.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'admin/pages', component: AdminPagesComponent },
  { path: 'admin/add-page', component: AdminAddPageComponent },
  { path: 'admin/edit-page/:id', component: AdminEditPageComponent },
  { path: ':page', component: PagesComponent },
  { path: '', component: PagesComponent },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PagesComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    AdminPagesComponent,
    AdminNavbarComponent,
    AdminAddPageComponent,
    AdminEditPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PageService, Title, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
