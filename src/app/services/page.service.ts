import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";

@Injectable()
export class PageService {
  constructor(private http: Http) { }
  public pageBehavior = new BehaviorSubject<string>(null);

  url: any = "http://localhost:3000/pages";

  // get req
  getPages() {
    return this.http.get(this.url).map(res => res.json());
  }
  getPage(slug) {
    return this.http.get(this.url + "/" + slug).map(res => res.json());
  }

  //post req
  addPage(value) {
    return this.http.post(this.url + '/add-page', value).map(res => res.json());
  }

  //edit page
  getEditPage(id) {
    return this.http.get(this.url + '/edit-page/' + id).map(res => res.json());
  }

  postEditPage(value) {
    return this.http.post(this.url + '/edit-page/' + value.id, value).map(res => res.json());
  }

  deletePage(id) {
    return this.http.get(this.url + '/delete-page/' + id).map(res => res.json());
  }
}
