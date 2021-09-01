import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';

import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
import {
  getDeepFromObject,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
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
import { NbDateFnsDateModule } from '@nebular/date-fns';
import '@angular/common/locales/global/de';
import { RedirectInterceptor } from './redirect.interceptor';
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
            endpoint: 'http://rr-laufchallenge:3333/api/auth/login',
            requireValidToken: true,
            redirect: {
              success: '/home',
              failure: null,
            },
          },
          register: {
            endpoint: 'http://rr-laufchallenge:3333/api/user',
            requireValidToken: true,
            redirect: {
              success: '/home',
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
          username: {
            required: true,
          },
        },
      },
    }),
    AppRoutingModule,
    TranslocoRootModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbIconModule,
    NbButtonModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' }),
  ],
  providers: [
    AuthGuard,
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: function () {
        return false;
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NbAuthJWTInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
