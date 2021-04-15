import { Component, OnInit } from '@angular/core';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: Array<User>;
  user: User;
  username: string;
  id: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(
        tap((res) => console.log('Tap', res)),
        catchError((res) => {
          console.log('catchError', res);
          return of([
            {
              id: 0,
              name: '-',
              username: '-',
              email: '-',
            },
          ]);
        })
      )
      .subscribe(
        (res) => {
          this.users = res;
        },
        (err) => {
          this.userService.handleError(err);
        }
      );

    this.userService.getUser(1).subscribe(
      (res) => {
        this.user = res[0];
      },
      (err) => {
        this.userService.handleError(err);
      }
    );
  }

  onQuery() {
    let query:any = {};
    if (this.id) {
      query.id = this.id;
    }
    if (this.username) {
      query.username = this.username;
    }
    this.userService.getUserQuery(query).subscribe(
      (res) => {
        console.log(res);
        this.users = res;
      },
      (err) => {
        this.userService.handleError(err);
      }
    );
  }
}
