import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { GsTableComponent } from './gs-table/gs-table.component';
@NgModule({
  declarations: [GsTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzRadioModule,
    NzTableModule,
    NzDividerModule,
  ],
  exports: [GsTableComponent],
})
export class GsComponentsModule {}
