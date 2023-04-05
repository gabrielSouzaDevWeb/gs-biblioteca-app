import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GsFabComponent } from './gs-fab/gs-fab.component';
import { GsTableComponent } from './gs-table/gs-table.component';
@NgModule({
  declarations: [GsTableComponent, GsFabComponent],
  imports: [
    NzOverlayModule,
    NzToolTipModule,
    NzButtonModule,
    NzIconModule,
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
