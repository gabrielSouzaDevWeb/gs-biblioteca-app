import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnTypes } from '../../lib/enum/table.enum';
import { LivroService } from './../../../shared/service/livro.service';
import { IGsfabButton } from './../../lib/interface/fab.interface';
import { IColumn } from './../../lib/interface/table.interface';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss'],
})
export class LivroComponent {
  public form!: FormGroup;
  title: string = 'Livros';
  count: number = 2;

  actions!: IGsfabButton[];
  loadingTable: boolean = false;

  public displayData: {
    idPrivado?: number;
    idPublico?: string;
    nomLivro: string;
    nomAutor: string;
    categoria: string;
    estante?: string;
    prateleira?: string;
    qntdPaginas: number;
    unidades: number;
    dtAlteracao?: Date;
    dtCriacao?: Date;
    dtDeletado?: Date;
    checked?: boolean;
  }[] = [
    {
      checked: false,
      idPrivado: 1,
      idPublico: '1',
      nomLivro: 'Coração de Tinta',
      nomAutor: 'Emily',
      categoria: 'Romance',
      estante: '2b',
      prateleira: '5',
      qntdPaginas: 313,
      unidades: 2,
      //   dtAlteracao?: Timestamp;
      dtCriacao: new Date('2023-05-05 09:38:33.678'),
      //   dtDeletado?: Timestamp;
    },
    {
      checked: false,
      idPrivado: 1,
      idPublico: '1',
      nomLivro: 'Coração de Tinta',
      nomAutor: 'Emily',
      categoria: 'Romance',
      estante: '2b',
      prateleira: '5',
      qntdPaginas: 313,
      unidades: 2,
      //   dtAlteracao?: Timestamp;
      dtCriacao: new Date('2023-05-05 09:38:33.678'),
      //   dtDeletado?: Timestamp;
    },
  ];

  columns: IColumn[] = [
    {
      label: 'código',
      columnName: 'idPublico',
      type: ColumnTypes.STRING,
      width: '4em',
      visible: true,
    },
    {
      label: 'Status',
      columnName: 'statusLocacao',
      type: ColumnTypes.NUMBER,
      visible: false,
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
      label: 'Data criação',
      columnName: 'dtCriacao',
      type: ColumnTypes.DATE,
      visible: true,
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
  constructor(public service: LivroService, private formBuilder: FormBuilder) {
    this.criarFormulario();
    this.criarFabButton();
  }

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

  getRegistrys = () => {
    console.log('123');
  };

  check(event: any) {
    console.log(event);
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
      // {
      //   label: 'Cancelar',
      //   icon: 'stop',
      //   changeContext: true,
      //   condition: this.visible,
      //   color: 'red',
      //   func: this.limparFecharFormulario,
      // },
      // {
      //   label: 'Limpar formulário',
      //   icon: 'clear',
      //   condition: this.visible,
      //   color: 'red',
      //   func: this.limparFormulario,
      // },
      // {
      //   label: 'Novo cadastro',
      //   icon: 'plus',
      //   changeContext: true,
      //   condition: !this.visible,
      //   color: 'red',
      //   func: this.criarNovoCadastro,
      // },
      // {
      //   label: 'Salvar',
      //   icon: 'save',
      //   changeContext: true,
      //   condition: this.visible,
      //   color: 'red',
      //   func: this.salvarRegistro,
      // },
      // {
      //   label: 'Deletar',
      //   icon: 'delete',
      //   condition: !this.visible,
      //   color: 'red',
      //   func: this.deletarRegistro,
      // },
      // {
      //   label: 'Editar',
      //   icon: 'edit',
      //   changeContext: true,
      //   condition: !this.visible,
      //   color: 'red',
      //   func: this.editarRegistro,
      // },
      // {
      //   label: 'Atualizar',
      //   icon: 'reload',
      //   condition: !this.visible,
      //   color: 'red',
      //   func: this.getRegistrys,
      // },
    ];
  }
}
