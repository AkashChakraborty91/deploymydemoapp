import { Component, OnInit } from '@angular/core';
import { Todos } from './model/Todos';
import { TodoApiService } from './todo-api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public todoList:any=[];
  public searchedList:any=[];
  public newTodos:any='';
  public totalRows:number=0;
  public page:number=1;
  public selectedTodo:any=[];
  public customDate:any='';

  constructor(private tdService:TodoApiService) { 
   let dt = new Date();
   this.customDate = dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear();
    this.newTodos = new Todos('','',this.customDate);
  }

  populateTodo(){
    this.tdService.getAllTodos()
    .subscribe((res:any)=>{
      this.todoList = res;
      this.totalRows = res.length;
    })
  }

  ngOnInit(): void {
    this.populateTodo();
  }

  onChange(todo:any){
    this.selectedTodo = todo;
    console.log(this.selectedTodo);

    this.newTodos = new Todos(this.selectedTodo.title,this.selectedTodo.description,this.customDate);
  }

  onSubmit(){
    console.log(this.newTodos);
    this.tdService.addTodo(this.newTodos)
    .subscribe((res:any)=>{
      console.log(res);
      alert(res.msg);
      this.populateTodo();
    })
  }

  onUpdate(){
    console.log('Updated');
    console.log(this.newTodos)

    this.tdService.updateTodo(this.selectedTodo._id,this.newTodos)
    .subscribe((res:any)=>{
      console.log(res);
      alert(res.msg);
      this.populateTodo();
    })
  }

  onDelete(){
    console.log('deleted');
    var r = confirm('Do You want to Delete this Record?');
    if(r){
      this.tdService.deleteTodo(this.selectedTodo._id)
      .subscribe((res:any)=>{
        console.log(res);
        alert(res.msg);
        this.populateTodo();
      })
    }
  }

  onSearch(data:any){
    let value = data.value;
    if(value.length>=3){
      console.log(value);
      this.searchedList = this.todoList.filter((item:any)=>{
        return (item.title.toLowerCase().includes(value.toLowerCase()));
      });
      console.log(this.searchedList);
    }
  }

}
