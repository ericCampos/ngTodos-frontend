import Todo from '../models/todo.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    api_url = 'https://ngtodos-ericcamposg.c9users.io';
    todoUrl = `${this.api_url}/api/todos`;
    
    constructor (private http: HttpClient) {}
    
    // Create todo, takes a Todo Object
    createTodo(todo:Todo): Observable<any>{
        
        //returns the observable of http post request
        
        return this.http.post(`${this.todoUrl}`, todo);
    }
    
    // Read todo, takes no arguments
    getTodos(): Observable<Todo[]>{
        
        return this.http.get(this.todoUrl)
        .map(res => {
            // Maps the response object sent by the server
            
            return res["data"].docs as Todo[];
        })
    }
    
    // Update todo, takes a Todo Object as parameter
    editTodo(todo:Todo) {
        
        let editUrl = `${this.todoUrl}`
        
        //Returns the Observable of the http put request
        return this.http.put(editUrl, todo);
    }
    
    // Delete todo, takes an id argument
    deleteTodo(id:string):any {
        
        let deleteUrl = `${this.todoUrl}/${id}`
        
        return this.http.delete(deleteUrl)
        .map(res => {
            return res;
            
        })
    }
    
    // Defalut error handling
    private handleError(error:any):Promise<any>{
        
        console.error('An error ocurred ', error); //Demo purpose only
        
        return Promise.reject(error.message || error);
    }
}