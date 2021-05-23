import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DotaskComponent } from './components/dotask/dotask.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StartProcessComponent } from './components/start-process/start-process.component';
import { StartComponent } from './components/start/start.component';
import { StatusComponent } from './components/status/status.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UploadComponent } from './components/upload/upload.component';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login" ,component: LoginComponent },
  {
    path: "home",canActivate :[AuthGuard] ,component: HomeComponent, children: [
      { path: "upload", component: UploadComponent },
      {path:"status",component:StatusComponent},
      { path: "start",component: StartComponent ,children : [
        {path: "process/:processdefinitionkey",component: StartProcessComponent}
      ] },
      { path: "tasks",component: TasksComponent ,children : [
        {path: "do/:taskid",component: DotaskComponent}
      ] }



    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
