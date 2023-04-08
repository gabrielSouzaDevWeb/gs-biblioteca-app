import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { GsFabComponent } from './gs-fab/gs-fab.component';
import { GsTableComponent } from './gs-table/gs-table.component';
import { GsTableService } from './gs-table/gs-table.service';
@NgModule({
  declarations: [GsTableComponent, GsFabComponent],
  imports: [
    NzTagModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    NzNotificationModule,
    NzPaginationModule,
    NzCollapseModule,
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
  providers: [GsTableService],
  exports: [GsTableComponent, GsFabComponent],
})
export class GsComponentsModule {}
