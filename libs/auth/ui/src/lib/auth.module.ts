import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
    AuthRoutingModule,
    TranslocoModule,
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
