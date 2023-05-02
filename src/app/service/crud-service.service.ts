import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Task } from '../model/task';
import { ITask } from '../Interface/ITask';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  serviceUrl : string;

  constructor(private http : HttpClient) 
  { 
    this.serviceUrl = "http://localhost:3000/tasks";
  }

  addTask(task : ITask) : Observable<ITask> {
    return this.http.post<ITask>(this.serviceUrl, task);
  }

  getAllTask() : Observable<ITask[]> {
    return this.http.get<ITask[]>(this.serviceUrl);
  }

  deleteTask(task : ITask) : Observable<ITask> {
    return this.http.delete<ITask>(this.serviceUrl+'/'+task.id);
  }

  editTask(task : ITask) : Observable<ITask> {
    return this.http.put<ITask>(this.serviceUrl+'/'+task.id, task);
  }
}
