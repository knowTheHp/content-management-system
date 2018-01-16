import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {
  private param: any;
  public pageBody: any;
  public pages: any;
  constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService, private title: Title) {
  }

  ngOnInit() {
    // get all pages
    this.pageService.getPages().subscribe(pages => {
      this.pages = pages;
    });

    this.route.params.subscribe(params => {
      this.param = params['page'];

      if (this.param === undefined) {
        this.param = 'home';
        this.title.setTitle('Cms');
      }else {
        this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }

      // get content for the specifc page
      this.pageService.getPage(this.param).subscribe(pageBody => {
        if (pageBody == null) {
          this.router.navigateByUrl(''); // home
        }
        this.pageBody = pageBody;
      });
    });
  }
}
