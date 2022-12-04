import { AbstractService } from './service/abstract.service';
import { AuthService } from './service/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, AbstractService],
})
export class SharedModule {}
