import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';

const appRoutes: Routes = [
  {
    path: 'board',
    component: BoardComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
