import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }

  userExists: boolean;
  ngOnInit() {
    //if user already logged in
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('');
    }
  }

  register({ value, valid }) {
    if (valid) {
      this.userService.register(value).subscribe((res) => {
        if (res == 'userExists') {
          this.userExists = true;
          setTimeout(() => {
            this.userExists = false;
          }, 2000);
        } else {
          localStorage.setItem('userRegistered', "true");
          this.router.navigateByUrl('/login');
        }
      });
    }
  }
}
