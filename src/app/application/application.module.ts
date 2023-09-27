import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from './../app-routing.module';
import { IconsProviderModule } from './../icons-provider.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GsComponentsModule } from './components/gs-components.module';
import { MainComponent } from './layouts/main/main.component';
import { AlunoComponent } from './pages/aluno/aluno.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LivroComponent } from './pages/livro/livro.component';

@NgModule({
  declarations: [
    // GsFabComponent,
    MainComponent,
    DashboardComponent,
    AlunoComponent,
    LivroComponent,
  ],

  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NzModalModule,
    NzFormModule,
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
  providers: [{ provide: NzModalRef, useValue: null }],
  exports: [MainComponent],
})
export class ApplicationModule {}
