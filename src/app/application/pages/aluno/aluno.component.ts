import { Component } from '@angular/core';
import { IAluno } from 'src/app/shared/interface/aluno.interface';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import { IQueryParams } from '../../lib/interface/table.interface';
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
  displayData!: ItemData[];
  count: number = 0;
  actions;
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
      columnName: 'idPublico',
      type: ColumnTypes.NUMBER,
      seachable: true,
      visible: true,
    },
    {
      label: 'Nome',
      columnName: 'nome',
      type: ColumnTypes.STRING,
      seachable: true,
      visible: true,
    },
    {
      label: 'Matricula',
      columnName: 'matricula',
      type: ColumnTypes.STRING,
      seachable: true,
      visible: true,
    },
    {
      label: 'Registro',
      columnName: 'registro',
      type: ColumnTypes.STRING,
      seachable: true,
      visible: true,
    },
    {
      label: 'Sala',
      columnName: 'sala',
      type: ColumnTypes.NUMBER,
      seachable: true,
      visible: true,
    },
    {
      label: 'Ações',
      columnName: 'action',
      type: ColumnTypes.ACTION,
      visible: false,
    },
  ];

  constructor(public service: AlunoService) {
    // this.displayData = this.generateData();
    this.actions = [
      {
        label: 'ver',
        icon: 'eye',
        condition: true,
        color: 'red',
        func: this.getChecked,
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
        label: 'Atualizar',
        icon: 'reload',
        condition: true,
        color: 'red',
        func: this.getRegistrys,
      },
    ];
  }

  check(event: {
    displayData: IAluno[];
    checkeds: IAluno[];
    checked: IAluno | undefined;
  }) {
    console.log(event);
  }

  getRegistrys = (filters?: any) => {
    this.getAlunos(filters);
  };

  getChecked = () => {
    const checkeds = this.displayData.filter((data) => data.checked);
    console.log(checkeds);
  };

  getAlunos(params?: IQueryParams) {
    params = {
      ...params,
      title: this.title,
      entity: this.entity,
    };
    console.log(params);
    let alunos: any;
    this.service.getAll(params).subscribe(
      (result) => {
        this.count = result.data.count;
        this.displayData = result.data.result.map((dt: any) => {
          return {
            ...dt,
            checked: false,
            expand: false,
          };
        });
        this.service.notification.success(
          this.title,
          'Consulta Realizada com sucesso!'
        );
      },
      (error) => console.log(error),
      () => console.log(alunos)
    );
    console.log(alunos);
  }

  getRegistroSelecionado(): any | void {
    const registrys = this.displayData.filter((data) => data.checked);
    if (registrys.length > 0) {
      this.service.notification.warning(
        this.title,
        'Muitos alunos selecionados!'
      );
      return;
    }
    if (registrys.length === 0) {
      this.service.notification.warning(
        this.title,
        'Nenhum aluno selecionado!'
      );
      return;
    }

    return registrys[0];
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
