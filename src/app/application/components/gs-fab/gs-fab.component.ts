import { Component } from '@angular/core';

interface IGsfabButton {
  label: string;
  icon: string;
  condiiton: boolean;
  color?: string;
  func: () => void;
}

@Component({
  selector: 'gs-fab',
  templateUrl: './gs-fab.component.html',
  styleUrls: ['./gs-fab.component.scss'],
})
export class GsFabComponent {
  isExpand: boolean = false;
  showActions = false;
  actions: IGsfabButton[] = [];
  constructor() {
    this.buildB();
    console.log(this.actions);
  }

  executeFunction(fn: any) {
    console.log(fn);
    fn();
  }

  buildB() {
    this.actions = [
      {
        label: 'Salvar',
        icon: 'save',
        condiiton: true,
        color: 'red',
        func: this.log,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condiiton: true,
        color: 'red',
        func: this.log,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condiiton: true,
        color: 'red',
        func: this.log,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condiiton: true,
        color: 'red',
        func: this.log,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condiiton: true,
        color: 'red',
        func: this.log,
      },
    ];
  }

  performAction(action: any) {
    console.log(`Performing action ${action.label}`);
  }

  log = () => {
    console.log('red');
  };
}
