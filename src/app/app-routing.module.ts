import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }, { path: 'todo', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
