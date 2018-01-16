import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  pages: any;
  user: string;

  //get logged in user
  get userLoggedIn() {
    if (localStorage.getItem('user')) {
      this.user = localStorage.getItem('user').replace(/\"/g, "");
      return true;
    } else {
      return false;
    }
  }

  constructor(private pageService: PageService) { }
  ngOnInit() {
    this.pageService.getPages().subscribe(pages => {
      this.pageService.pageBehavior.next(pages);
      this.pages = this.pageService.pageBehavior;
    });
  }

}
