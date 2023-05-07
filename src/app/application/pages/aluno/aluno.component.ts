import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAluno } from 'src/app/shared/interface/aluno.interface';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import { ColumnTypes } from '../../lib/enum/table.enum';
import {
  IColumn,
  IDisplayDataState,
  IQueryParams,
} from '../../lib/interface/table.interface';
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
// const enum ColumnTypes {
//   'ACTION' = 0,
//   'STRING' = 1,
//   'NUMBER' = 2,
//   'DATA' = 3,
// }
@Component({
  selector: 'aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'],
})
export class AlunoComponent {
  public title: string = 'Aluno';
  public entity: string = 'aluno';
  public detalheColumnName: string = 'livros';
  displayDataState!: IDisplayDataState<IAluno>;

  loadingTable: boolean = false;

  displayData!: ItemData[];
  count: number = 0;
  actions!: IGsfabButton[];
  visible: boolean = false;
  //TODO: colocar as configs de todas as tabelas em arquivos em uma pasta separada
  detalheColumns: IColumn[] = [
    {
      label: 'código',
      columnName: 'idPrivado',
      type: ColumnTypes.STRING,
      width: '2em',
      visible: true,
    },
    {
      label: 'Status',
      columnName: 'statusLocacao',
      type: ColumnTypes.NUMBER,
      visible: true,
    },
    {
      label: 'Nome do livro',
      columnName: 'nomLivro',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Nome do autor',
      columnName: 'nomAutor',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Categoria',
      columnName: 'categoria',
      type: ColumnTypes.STRING,
      visible: true,
    },
    {
      label: 'Data locação',
      columnName: 'dtLocacao',
      type: ColumnTypes.DATE,
      visible: true,
    },
    {
      label: 'Data renovação',
      columnName: 'dtRenovacao',
      type: ColumnTypes.DATE,
      visible: true,
    },
    {
      label: 'Data vencimento',
      columnName: 'dtVencimento',
      type: ColumnTypes.DATE,
      visible: true,
    },
    // {
    //   label: 'Unidades',
    //   columnName: 'unidades',
    //   type: ColumnTypes.NUMBER,
    //   visible: true,
    // },
  ];
  columns: IColumn[] = [
    {
      label: 'Código',
      columnName: 'idPublico',
      type: ColumnTypes.NUMBER,
      width: '6em',
      seachable: false,
      visible: false,
    },
    {
      label: 'Nome',
      columnName: 'nome',
      type: ColumnTypes.STRING,
      seachable: true,
      float: 'LEFT',
      width: '18em',
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
      label: 'Cidade',
      columnName: 'cidade',
      type: ColumnTypes.STRING,
      seachable: true,
      visible: true,
    },
    {
      label: 'Rua',
      columnName: 'rua',
      type: ColumnTypes.STRING,
      seachable: true,
      visible: true,
    },
    {
      label: 'Data cadastro',
      columnName: 'dtCriacao',
      type: ColumnTypes.DATE,
      width: '12em',
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

  limparFecharFormulario = () => {
    this.close();
    this.limparFormulario();
  };
  eye = () => {
    console.log(this.form.value);
  };

  expand = (registro: any): void => {
    if (!registro[this.detalheColumnName]) {
      let detalhe: any;
      this.service.getDetalhe(registro.idPrivado).subscribe({
        next: (result) => {
          detalhe = result.data;
          console.log(detalhe);
          this.displayData = this.displayData.map((item, index, itens) => {
            if (itens.indexOf(registro) === index) {
              return { ...registro, [this.detalheColumnName]: detalhe };
            }
            return item;
          });
          this.service.notification.success(this.title, result.message);
        },
        error: (error) => {
          this.service.notification.error(this.title, error);
        },
      });
    }
  };

  criarFabButton() {
    /**
     * FIXME: quando clicar em editar e houver mais de um
     * registro marcado o botão é contraído. Isso só deve
     * acontecer se o modal for aberto
     * */
    this.actions = [
      {
        label: 'eye',
        icon: 'eye',

        condition: true,
        color: 'red',
        func: this.eye,
      },
      {
        label: 'Cancelar',
        icon: 'stop',
        changeContext: true,
        condition: this.visible,
        color: 'red',
        func: this.limparFecharFormulario,
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
        func: this.deletarRegistro,
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

  deletarRegistro = () => {
    if (this.getchecked()) {
      this.loadingTable = true;
      const aluno: IAluno = this.getchecked() as IAluno;
      this.service.deletar<IAluno>(aluno).subscribe({
        next: (response: any) => {
          /**
           * TODO: logica para remover aluno do displayData
           * do componente da tabela
           */

          //TODO: Modal de confirmação
          this.service.notification.success(this.title, response.message);
          this.getRegistrys();
          this.loadingTable = false;
        },
        error: (error) => {
          this.service.notification.error(this.title, error);
          this.loadingTable = false;
        },
      });
    }
  };

  salvarRegistro = (): void => {
    if (!this.form.valid) {
      this.service.notification.warning(
        this.title,
        'Preencha todos os campos corretamente!'
      );
      return;
    }
    this.loadingTable = true;
    if (this.form.value.idPrivado) {
      console.log('Entrou aqui!');
      this.service.editarRegistro(this.form.value).subscribe({
        next: (response: any) => {
          //TODO: implementar lógica de atualizar o registro no display data
          this.service.notification.success(this.title, response.message);
          this.loadingTable = false;
          this.getRegistrys();
          this.limparFecharFormulario();
          this.close();
        },
        error: (error) => {
          this.service.notification.error(this.title, error);
          this.loadingTable = false;
        },
      });
      return;
    }

    this.service.salvarRegistro(this.form.value).subscribe({
      next: (response: any) => {
        /**
         * TODO: o response traz o aluno cadastrado como retorno
         *  colocar adicionar ele no display data assim que é retornado
         */
        this.loadingTable = false;
        this.service.notification.success(this.title, response.message);
        this.getRegistrys();
        this.limparFormulario();
        return;
      },
      error: (error: any) => {
        this.loadingTable = false;
        this.service.notification.error(this.title, error);
      },
    });
  };

  editarRegistro = () => {
    if (this.getchecked()) {
      const aluno: IAluno = this.getchecked() as IAluno;

      console.log(aluno);
      this.form.patchValue({ ...aluno, numero: Number(aluno.numero) });
      this.open();
    }
  };

  getchecked(): IAluno | void {
    console.log(this.displayDataState);
    const alunos: IAluno[] = this.displayDataState.checkeds;
    if (alunos.length > 1) {
      this.service.notification.warning(
        this.title,
        'Muitos alunos Selecionados. Por favor, selecione apenas um!'
      );
      return;
    }
    if (alunos.length === 0) {
      this.service.notification.warning(
        this.title,
        'Nenhum aluno Selecionados. Por favor, selecione um!'
      );
      return;
    }
    return alunos[0] as IAluno;
  }

  check(event: IDisplayDataState<IAluno>) {
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
    params = {
      ...params,
      title: this.title,
      entity: this.entity,
    };
    // let alunos: any;
    this.count = 0;
    this.displayData = [];
    this.loadingTable = true;
    //TODO: Criar uma interface "abstractResponse"
    this.service.getAll<any>(params).subscribe({
      next: (result) => {
        this.loadingTable = false;
        this.count = result.data.count;
        this.displayData = result.data.result.map((dt: any) => {
          /**
           * TODO: Deixar os atributos (checked, expand)
           * sob resoponsabilidade do component gs-table
           */
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
        this.loadingTable = false;
        this.service.notification.error(this.title, error, {
          nzKey: JSON.stringify(error),
        });
      },
    });
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    // Promise.resolve().then(() =>
    //   this.validateForm.controls.checkPassword.updateValueAndValidity()
    // );
  }

  criarNovoCadastro = () => {
    this.limparFormulario();
    this.open();
  };

  criarFormulario(): void {
    /**
     * TODO: ao preencher o campo cep,
     *  consultar o backend para trazer
     *  o endereço completo. A Api irá
     *  fazer uma consulta na api do
     *  via CEP e retonar o endereço
     */

    /*
     * TODO
     */
    this.form = this.formBuilder.group({
      idPublico: [null],
      idPrivado: [null],
      nome: [null, Validators.required],
      matricula: [null, Validators.required],
      registro: [null, Validators.required],
      sala: [null, Validators.required],
      //endereço
      //TODO: trocar rua por logradouro
      rua: [null],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cidade: [null],
      uf: [null],
      cep: [null],
      // contato
      tel: [null, Validators.required],
      telResponsavel: [null, Validators.required],
      email: [null, Validators.required],
      //
      // dtCriacao: [null],
      // dtAlteracao: [null],
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
