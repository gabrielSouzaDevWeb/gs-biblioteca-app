import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ApplicationModule } from './application/application.module';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { httpInterceptorsProviders } from './shared/http-interceptors/index.interceptors';
import { reducers } from './store';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // retenção máxima do histórico de ações
    }),
    AppRoutingModule,
    NzSpinModule,
    SharedModule,
    BrowserModule,
    ApplicationModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }, httpInterceptorsProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
