import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http:HttpClient) { }

  getAllTodos(){
    return this.http.get('https://todolist-api.glitch.me/api/todos');
  }

  addTodo(data:any){
    return this.http.post('https://todolist-api.glitch.me/api/todo',data)
  }

  updateTodo(id:any,data:any){
    return this.http.put('https://todolist-api.glitch.me/api/todo/'+id,data);
  }

  deleteTodo(id:any){
    return this.http.delete('https://todolist-api.glitch.me/api/todo/'+id);
  }
}
