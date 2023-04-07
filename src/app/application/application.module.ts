import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './../app-routing.module';
import { IconsProviderModule } from './../icons-provider.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { GsComponentsModule } from './components/gs-components.module';
import { MainComponent } from './layouts/main/main.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    // GsFabComponent,
    MainComponent,
    DashboardComponent,
    AlunoComponent,
  ],
  imports: [
    NzAffixModule,
    GsComponentsModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    AppRoutingModule,
  ],
  exports: [MainComponent],
})
export class ApplicationModule {}
