import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API}`);
  }

  getUser(id) {
    return this.httpClient.get<User[]>(`${this.API}`, { params: { id: id } });
  }

  getUserQuery(query) {
    return this.httpClient.get<User[]>(`${this.API}`, {
      params: query,
    });
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
