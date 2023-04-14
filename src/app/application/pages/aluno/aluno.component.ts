import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAluno } from 'src/app/shared/interface/aluno.interface';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import { IQueryParams } from '../../lib/interface/table.interface';
import { IGsfabButton } from './../../lib/interface/fab.interface';

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
  displayDataState!: {
    displayData: IAluno[];
    checkeds: IAluno[];
    checked: IAluno;
  };

  displayData!: ItemData[];
  count: number = 0;
  actions!: IGsfabButton[];
  visible: boolean = false;
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

  public form!: FormGroup;

  constructor(public service: AlunoService, private formBuilder: FormBuilder) {
    this.criarFormulario();
    this.criarFabButton();
  }

  limparFormulario = () => {
    this.form.reset();
  };

  cancelarRegistro = () => {
    this.close();
    this.limparFormulario();
  };

  criarFabButton() {
    this.actions = [
      {
        label: 'Cancelar',
        icon: 'stop',
        changeContext: true,
        condition: this.visible,
        color: 'red',
        func: this.cancelarRegistro,
      },
      {
        label: 'Limpar formulário',
        icon: 'clear',
        condition: this.visible,
        color: 'red',
        func: this.limparFormulario,
      },
      {
        label: 'Novo cadastro',
        icon: 'plus',
        changeContext: true,
        condition: !this.visible,
        color: 'red',
        func: this.criarNovoCadastro,
      },
      {
        label: 'Salvar',
        icon: 'save',
        changeContext: true,
        condition: this.visible,
        color: 'red',
        func: this.salvarRegistro,
      },
      {
        label: 'Deletar',
        icon: 'delete',
        condition: !this.visible,
        color: 'red',
        func: this.getRegistrys,
      },
      {
        label: 'Editar',
        icon: 'edit',
        changeContext: true,
        condition: !this.visible,
        color: 'red',
        func: this.editarRegistro,
      },
      {
        label: 'Atualizar',
        icon: 'reload',
        condition: !this.visible,
        color: 'red',
        func: this.getRegistrys,
      },
    ];
  }

  salvarRegistro = (): void => {
    if (!this.form.valid) {
      this.service.notification.warning(
        this.title,
        'Preencha todos os campos corretamente!'
      );
      return;
    }
    // TODO: rotina de atualizar e rotina de editar

    this.service.salvarRegistro(this.form.value);
  };

  editarRegistro = () => {
    // TODO: criar função para evitar que editar com dois registros checkados
    this.form.patchValue(this.displayDataState.checked);
    this.open();
  };

  check(event: { displayData: IAluno[]; checkeds: IAluno[]; checked: IAluno }) {
    console.log(event);
    this.displayDataState = event;
  }

  getRegistrys = (filters?: any) => {
    this.getAlunos(filters);
  };

  getChecked = () => {
    const checkeds = this.displayData.filter((data) => data.checked);
    console.log(checkeds);
  };

  getAlunos(params?: IQueryParams) {
    //TODO: animação de carregamento
    params = {
      ...params,
      title: this.title,
      entity: this.entity,
    };
    let alunos: any;
    this.service.getAll(params).subscribe({
      next: (result) => {
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
          'Consulta Realizada com sucesso!',
          { nzKey: JSON.stringify(result) }
        );
      },
      error: (error) => {
        this.service.notification.error(
          this.title,
          `${error}. CODE_ERROR-500 GET-${this.title}`,
          {
            nzKey: JSON.stringify(error),
          }
        );
      },
      complete: () => console.log(alunos),
    });
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    // Promise.resolve().then(() =>
    //   this.validateForm.controls.checkPassword.updateValueAndValidity()
    // );
  }

  criarNovoCadastro = () => {
    this.open();
  };

  criarFormulario(): void {
    this.form = this.formBuilder.group({
      idPublico: [null],
      idPrivado: [null],
      nome: [null, Validators.required],
      matricula: [null, Validators.required],
      registro: [null, Validators.required],
      sala: [null, Validators.required],
      //endereço //TODO: trocar rua por logradouro
      rua: [null],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cidade: [null],
      uf: [null], //mudar para uf
      cep: [null],
      // contato
      tel: [null, Validators.required],
      telResponsavel: [null, Validators.required],
      email: [null, Validators.required],
    });
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

  open(): void {
    window.scrollTo({ top: 0, left: 0 });
    this.visible = true;
    this.criarFabButton();
  }

  close(): void {
    this.visible = false;
    this.criarFabButton();
  }
}
