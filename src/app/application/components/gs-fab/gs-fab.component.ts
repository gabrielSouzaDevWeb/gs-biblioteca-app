import { Component, Input, OnInit } from '@angular/core';
import { IGsfabButton } from './../../lib/interface/fab.interface';

@Component({
  selector: 'gs-fab',
  templateUrl: './gs-fab.component.html',
  styleUrls: ['./gs-fab.component.scss'],
})
export class GsFabComponent implements OnInit {
  isExpand: boolean = false;
  showActions = false;
  @Input() actions: IGsfabButton[] = [];
  constructor() {}

  ngOnInit() {}

  isSigleBtn(): boolean {
    return this.actions.filter((action) => action.condition).length === 1;
  }

  actionValid(): IGsfabButton {
    return this.actions.find((action) => action.condition) ?? this.actions[0];
  }
}
