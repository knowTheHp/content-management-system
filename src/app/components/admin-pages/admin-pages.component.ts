import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  //to hold pages
  pages: any;

  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(private pageService: PageService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== "\"admin\"") {
      this.router.navigateByUrl('');
    }
    this.pages = this.pageService.pageBehavior;
  }

  deletePage(id) {
    if (confirm('confirm deletion')) {
      this.pageService.deletePage(id).subscribe((res) => {
        if (res == 'error') {
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
        } else {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 2000);

          //auto update the total pages
          this.pageService.getPages().subscribe((pages) => {
            this.pageService.pageBehavior.next(pages);
          })
        }
      });
    }
  }
}
