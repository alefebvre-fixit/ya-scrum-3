import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }



  login(): void {
    alert('Mock log in as ' + this.username);
    this.router.navigate(['/']);
  }


}
