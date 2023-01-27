import { AppRoutingModule } from './../app-routing.module';
import { IconsProviderModule } from './../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    AppRoutingModule,
  ],
  exports: [MainComponent],
})
export class ApplicationModule {}
