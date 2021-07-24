import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';

@Component({
  selector: 'runno-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends NbRegisterComponent {}
