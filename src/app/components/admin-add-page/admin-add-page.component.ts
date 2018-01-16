import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '../../services/page.service';

//to use any third-party library
declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.css']
})
export class AdminAddPageComponent implements OnInit {

  successMessage: boolean = false;
  errorMessage: boolean = false;

  constructor(private pageService: PageService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== "\"admin\"") {
      this.router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }
  }

  addPage({ form, value, valid }) {
    form.reset();
    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this.pageService.addPage(value).subscribe((res) => {
        if (res == 'pageExists') {
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
        } else {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 2000);

          CKEDITOR.instances.content.setData('');
          //auto update the total pages
          this.pageService.getPages().subscribe((pages) => {
            this.pageService.pageBehavior.next(pages);
          })
        }
      });
    }
  }
}
