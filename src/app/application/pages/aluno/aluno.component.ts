import { Component } from '@angular/core';
import { AlunoService } from 'src/app/shared/service/aluno.service';
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
  public title: string = 'Aluno';
  public entity: string = 'aluno';
  displayData: readonly ItemData[];
  detalheColumns = [
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
      visible: false,
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
      visible: true,
    },
  ];
  columns = [
    {
      label: 'Código',
      columnName: 'idPrivado',
      type: ColumnTypes.NUMBER,
      visible: true,
    },
    {
      label: 'Nome',
      columnName: 'nome',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Matricula',
      columnName: 'matricula',
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

  actions;

  constructor(public service: AlunoService) {
    this.displayData = this.generateData();
    this.actions = [
      {
        label: 'Salvar',
        icon: 'save',
        condition: false,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Deletar',
        icon: 'delete',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Salvar',
        icon: 'save',
        condition: false,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Deletar',
        icon: 'delete',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Salvar',
        icon: 'save',
        condition: false,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Deletar',
        icon: 'delete',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Salvar',
        icon: 'save',
        condition: false,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Deletar',
        icon: 'delete',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Editar',
        icon: 'reload',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Editar',
        icon: 'edit',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
    ];
  }

  getRegistrys = () => {
    this.getAlunos();
  };

  getAlunos() {
    let alunos: any;
    this.service.getAll({ title: this.title }).subscribe(
      (result) => (this.displayData = result.data),
      (error) => console.log(error),
      () => console.log(alunos)
    );
    console.log(alunos);
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
