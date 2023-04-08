import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class GsTableService {
  public notification!: NzNotificationService;
  constructor(notification: NzNotificationService) {}
}
