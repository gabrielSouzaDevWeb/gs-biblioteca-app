import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ILivro } from 'src/app/shared/interface/livro.interface';
import { ColumnTypes } from '../../lib/enum/table.enum';
import { AlunoComponent } from '../aluno/aluno.component';
import { LivroService } from './../../../shared/service/livro.service';
import { IGsfabButton } from './../../lib/interface/fab.interface';
import {
  IColumn,
  IDisplayDataState,
  IQueryParams,
} from './../../lib/interface/table.interface';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss'],
})
export class LivroComponent implements OnInit {
  public form!: FormGroup;
  title: string = 'Livros';
  entity: string = 'livro';
  count: number = 2;
  visible: boolean = false;
  displayDataState!: IDisplayDataState<ILivro>;
  actions!: IGsfabButton[];
  loadingTable: boolean = false;
  @Output() readonly modalOpen!: { from: string; data: any };

  public displayData!: ILivro[];

  columns: IColumn[] = [
    {
      label: 'código',
      columnName: 'idPublico',
      type: ColumnTypes.STRING,
      width: '5em',
      visible: true,
      seachable: false,
    },
    {
      label: 'Status',
      columnName: 'statusLocacao',
      type: ColumnTypes.NUMBER,
      visible: false,
      seachable: true,
    },
    {
      label: 'Nome do livro',
      columnName: 'nomLivro',
      type: ColumnTypes.STRING,
      width: '18em',
      float: 'LEFT',
      visible: true,
      seachable: true,
    },
    {
      label: 'Nome do autor',
      columnName: 'nomAutor',
      type: ColumnTypes.STRING,
      width: '12em',
      visible: true,
      seachable: true,
    },
    {
      label: 'genero',
      columnName: 'genero',
      type: ColumnTypes.STRING,
      width: '10em',
      visible: true,
      seachable: true,
    },
    {
      label: 'Estante',
      columnName: 'estante',
      type: ColumnTypes.NUMBER,
      width: '12em',
      visible: true,
      seachable: true,
    },
    {
      label: 'Prateleira',
      columnName: 'prateleira',
      type: ColumnTypes.NUMBER,
      width: '8em',
      visible: true,
      seachable: true,
    },
    {
      label: 'Unid.',
      columnName: 'unidades',
      type: ColumnTypes.NUMBER,
      width: '5em',
      visible: true,
      seachable: true,
    },
    {
      label: 'Págs',
      columnName: 'qntdPaginas',
      type: ColumnTypes.NUMBER,
      width: '5em',
      visible: true,
      seachable: true,
    },
    {
      label: 'Data criação',
      columnName: 'dtCriacao',
      type: ColumnTypes.DATE,
      width: '12em',
      visible: true,
      // seachable: true,
    },
    // {
    //   label: 'Data renovação',
    //   columnName: 'dtRenovacao',
    //   type: ColumnTypes.DATE,
    //   visible: true,
    // },
    // {
    //   label: 'Data vencimento',
    //   columnName: 'dtVencimento',
    //   type: ColumnTypes.DATE,
    //   visible: true,
    // },
    // {
    //   label: 'Unidades',
    //   columnName: 'unidades',
    //   type: ColumnTypes.NUMBER,
    //   visible: true,
    // },
  ];
  constructor(
    public service: LivroService,
    private readonly modalRef: NzModalRef<AlunoComponent>,
    private formBuilder: FormBuilder
  ) {
    this.criarFormulario();
    this.criarFabButton();
  }

  criarFormulario(): void {
    this.form = this.formBuilder.group({
      idPublico: [null],
      idPrivado: [null],
      nomLivro: [null, Validators.required],
      nomAutor: [null],
      genero: [null],
      prateleira: [null],
      qntdPaginas: [null],
      estante: [null],
      unidades: [null],
    });
  }

  ngOnInit() {
    this.criarFormulario();
    this.criarFabButton();
  }

  getRegistrys = (filters?: any) => {
    this.getLivros(filters);
  };

  getLivros(params?: IQueryParams) {
    params = {
      ...params,
      title: this.title,
      entity: this.entity,
    };
    this.count = 0;
    this.displayData = [];
    this.loadingTable = true;
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

  check(event: IDisplayDataState<ILivro>) {
    console.log(event);
    this.displayDataState = event;
  }

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
        func: () => {
          console.log('eye');
        },
        condition: true,
        color: 'red',
        // func: this.eye,
      },
      {
        label: 'Selecionar livro!',
        icon: 'select',
        changeContext: true,
        condition: !!this.modalOpen,
        func: this.select,
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

  select = () => {
    if (this.getchecked()) {
      const livros: Array<ILivro> = [this.getchecked()] as Array<ILivro>;
      this.modalRef.close({ livros });
    }
  };

  criarNovoCadastro = () => {
    this.limparFormulario();
    this.open();
  };
  limparFormulario = () => {
    this.form.reset();
  };

  limparFecharFormulario = () => {
    this.close();
    this.limparFormulario();
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
         * TODO: o response traz o livro cadastrado como retorno
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

  deletarRegistro = () => {
    if (this.getchecked()) {
      this.loadingTable = true;
      const aluno: ILivro = this.getchecked() as ILivro;

      //implementar abstract response
      this.service.deletar<ILivro>(aluno).subscribe({
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

  editarRegistro = () => {
    if (this.getchecked()) {
      const livro: ILivro = this.getchecked() as ILivro;

      console.log(livro);
      this.form.patchValue({ ...livro });
      this.open();
    }
  };

  getchecked(): ILivro | void {
    console.log(this.displayDataState);
    const livros: ILivro[] = this.displayDataState.checkeds;
    if (livros.length > 1) {
      this.service.notification.warning(
        this.title,
        'Muitos livros Selecionados. Por favor, selecione apenas um!'
      );
      return;
    }
    if (livros.length === 0) {
      this.service.notification.warning(
        this.title,
        'Nenhum livro Selecionados. Por favor, selecione um!'
      );
      return;
    }
    return livros[0] as ILivro;
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
