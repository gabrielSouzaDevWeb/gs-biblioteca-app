export interface ILivro {
  idPrivado: number;
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
}
