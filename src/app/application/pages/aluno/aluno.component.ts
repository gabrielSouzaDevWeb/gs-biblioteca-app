import { Component } from '@angular/core';
interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}
// interface IColumn {
//   label: string;
//   columnName: string;
//   visible: boolean;
//   type: ColumnTypes.NUMBER | ColumnTypes.STRING | ColumnTypes.ACTION;
//   // compare: (a: any, b: any) => any;
// }
const enum ColumnTypes {
  'ACTION' = 0,
  'STRING' = 1,
  'NUMBER' = 2,
}
@Component({
  selector: 'aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
})
export class AlunoComponent {
  displayData: readonly ItemData[];
  columns = [
    {
      label: 'Nome',
      columnName: 'name',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Idade',
      columnName: 'age',
      type: ColumnTypes.NUMBER,
      visible: true,
    },
    {
      label: 'Endereço',
      columnName: 'address',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Ações',
      columnName: 'action',
      type: ColumnTypes.ACTION,
      visible: false,
    },
  ];
  constructor() {
    this.displayData = this.generateData();
  }
  generateData(): readonly ItemData[] {
    const data = [];
    const alp = ['a', 'b'];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: `${alp[i % 2]} John Brown`,
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        children: [
          {
            name: `${alp[i % 2]} John Brown`,
            age: `${i}2`,
            address: `New York No. ${i} Lake Park`,
            description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
            checked: false,
            expand: false,
          },
        ],
        checked: false,
        expand: false,
      });
    }
    return data;
  }
}
