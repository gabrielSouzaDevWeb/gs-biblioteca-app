import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AbstractService } from './service/abstract.service';
import { AuthService } from './service/auth.service';

function tokenGetter() {
  return sessionStorage.getItem('token');
}
@NgModule({
  declarations: [],
  imports: [CommonModule, NzNotificationModule],
  providers: [AuthService, AbstractService],
})
export class SharedModule {}
