import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../services/page.service';


//to use any third-party library
declare var CKEDITOR: any;

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.css']
})
export class AdminEditPageComponent implements OnInit {

  title: string;
  content: string;
  id: string;
  param: any;
  successMessage: boolean = false;
  pageExists: boolean = false;
  unknownError: boolean = false;

  constructor(private route: ActivatedRoute, private pageService: PageService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== "\"admin\"") {
      this.router.navigateByUrl('');
    } else {
      CKEDITOR.replace('content');
    }
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.pageService.getEditPage(this.param).subscribe(page => {
        this.title = page.title;
        this.content = page.content;
        this.id = page._id;
      });
    });
  }

  editPage({ value, valid }) {
    if (valid) {
      value.content = CKEDITOR.instances.content.getData();
      this.pageService.postEditPage(value).subscribe((res) => {
        if (res == 'pageExists') {
          this.pageExists = true;
          setTimeout(() => {
            this.pageExists = false;
          }, 2000);
        } else if (res == 'problem') {
          this.unknownError = true;
          setTimeout(() => {
            this.unknownError = false;
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
