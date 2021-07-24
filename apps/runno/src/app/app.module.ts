import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';

import { NbLayoutModule, NbMenuModule, NbThemeModule } from '@nebular/theme';
import {
  getDeepFromObject,
  NbAuthModule,
  NbAuthSimpleToken,
  NbPasswordAuthStrategy,
  NbPasswordAuthStrategyOptions,
} from '@nebular/auth';
import { AppRoutingModule } from './app-routing.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthGuard } from './auth-guard.service';
import { PublicRouteShellComponent } from './public-route-shell/public-route-shell.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [AppComponent, PublicRouteShellComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '',
          login: {
            endpoint: '/api/auth/login',
            requireValidToken: true,
            redirect: {
              success: '/',
              failure: null,
            },
          },
          register: {
            endpoint: '/api/user',
            requireValidToken: true,
            redirect: {
              success: '/',
              failure: null,
            },
          },
          token: {
            class: NbAuthSimpleToken,
            key: 'access_token',
            getter: (
              module: string,
              res: HttpResponse<any>,
              options: NbPasswordAuthStrategyOptions
            ) => {
              if (!res.body || !options?.token?.key) {
                console.error('could not extract token', options, res);
                throw new Error('could not extract token');
              }
              return getDeepFromObject(res.body, options.token.key);
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
        validation: {
          password: {
            required: true,
          },
          email: {
            required: true,
          },
        },
      },
    }),
    AppRoutingModule,
    TranslocoRootModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
