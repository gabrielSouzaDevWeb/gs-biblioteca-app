import { Component, OnInit } from '@angular/core';

export interface ISideMenu {
  title: string;
  icon: string;
  router?: string;
  children: ISideMenu[];
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  public sideMenu: ISideMenu[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      router: 'session/dashboard',
      children: [],
    },
    {
      title: 'Alunos',
      icon: 'usergroup-add',
      children: [
        // {
        //   title: 'Consultar Alunos',
        //   router: 'session/aluno/consultar',
        //   icon: 'user',
        //   children: [],
        // },
        {
          title: 'aluno',
          router: 'session/aluno',
          icon: 'user',
          children: [],
        },
      ],
    },
    {
      title: 'Livros',
      icon: 'book',
      children: [
        {
          title: 'Livro',
          router: 'session/livro',
          icon: 'book',
          children: [],
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.sideMenu[0].children?.length;
  }
}
