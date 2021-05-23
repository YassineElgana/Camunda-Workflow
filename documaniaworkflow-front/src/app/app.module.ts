import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppTextConfigService } from './services/i18n/app-text-config-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/auth/basic-auth-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { CamundaRestService } from './services/rest/camunda-rest.service';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { StartComponent } from './components/start/start.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { StartProcessComponent } from './components/start-process/start-process.component';
import { GenericformComponent } from './components/genericform/genericform.component';
import { DotaskComponent } from './components/dotask/dotask.component';
import { NgBpmnEditorModule } from 'ng-bpmn';
import { ViewbpmnComponent } from './components/viewbpmn/viewbpmn.component';
import { FormioModule } from 'angular-formio';
import { StatusComponent } from './components/status/status.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import  {NgxPaginationModule}   from 'ngx-pagination'
import {  NbListComponent, NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadComponent,
    StartComponent,
    TasksComponent,
    StartProcessComponent,
    GenericformComponent,
    DotaskComponent,
    ViewbpmnComponent,
    StatusComponent,
    ConfirmationComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgBpmnEditorModule,
    FormioModule, 
    NgxPaginationModule,
    NbThemeModule.forRoot(),
  

    
    
  ],
  providers: [
    AppTextConfigService,
    CamundaRestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
