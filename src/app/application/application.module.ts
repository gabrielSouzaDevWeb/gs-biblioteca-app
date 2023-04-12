import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './../app-routing.module';
import { IconsProviderModule } from './../icons-provider.module';

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NzDividerModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzGridModule,
    NzDrawerModule,
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
