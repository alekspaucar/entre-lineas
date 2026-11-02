import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/library/library.page').then((m) => m.LibraryPage),
    title: 'Biblioteca — Entre líneas',
  },
  {
    path: 'leer/:id',
    loadComponent: () =>
      import('./features/reader/reader.page').then((m) => m.ReaderPage),
    title: 'Entre líneas',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
