import { Component, OnInit } from '@angular/core';
import { User } from './user/user';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: Array<User>;
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.userService.getUser(1).subscribe((res) => {
      this.user = res[0];
    })
  }
}
