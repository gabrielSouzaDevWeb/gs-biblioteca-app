import { ILivro } from '../interface/livro.interface';

export const livroAdapter = (objects: Array<any>): Array<ILivro> => {
  let retornar = objects.map((object) => {
    return object.livrosEmprestado.map((livroEmprestado: any) => {
      return {
        idPrivadoEmprestimo: object.idPrivado,
        idPrivadoLivroEmprestado: livroEmprestado.idPrivado,
        idPrivadoLivro: livroEmprestado.livro.idPrivado,
        idPublicoEmprestimo: object.idPublico,
        idPublicoLivroEmprestado: livroEmprestado.idPublico,
        idPublicoLivro: livroEmprestado.livro.idPublico,
        statusLocacao: object.status,
        nomLivro: livroEmprestado.livro.nomLivro,
        nomAutor: livroEmprestado.livro.autor,
        categoria: livroEmprestado.livro.genero,
        dtLocacao: object.dtCriacao,
        dtRenovacao: livroEmprestado.dtRenovacao,
        dtVencimento: livroEmprestado.dtVencimento,
      };
    });
  });
  //TODO: verificar o motivo de estar retornando uma matriz ao invés de um array
  return retornar[0] as Array<ILivro>;
};
