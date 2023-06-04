import { ILivro } from '../interface/livro.interface';

export const livroEmprestadoAdapter = (objects: Array<any>): Array<ILivro> => {
  const livroEmprestadoAdapter: Array<ILivro | any> = [];
  for (const object of objects) {
    for (const livroEmprestado of object.livrosEmprestado) {
      livroEmprestadoAdapter.push({
        idPrivadoEmprestimo: object.idPrivado,
        idPrivadoLivrosEmprestado: livroEmprestado.idPrivado,
        idPrivadoLivro: livroEmprestado.livro.idPrivado,
        idPublicoEmprestimo: object.idPublico,
        idPublicoLivroEmprestado: livroEmprestado.idPublico,
        idPublicoLivro: livroEmprestado.livro.idPublico,
        statusLocacao: object.status,
        nomLivro: livroEmprestado.livro.nomLivro,
        nomAutor: livroEmprestado.livro.nomAutor,
        genero: livroEmprestado.livro.genero,
        dtLocacao: object.dtCriacao,
        dtRenovacao: livroEmprestado.dtRenovacao,
        dtVencimento: livroEmprestado.dtVencimento,
      });
    }
  }

  return livroEmprestadoAdapter as Array<ILivro>;
};
