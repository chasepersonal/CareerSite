import { Component, OnInit } from '@angular/core';
import { butterService } from '../../_services/butterCMS.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postPage: any;
  posts: any;

  constructor() { }

  ngOnInit() {
    this.getPostPage();
    this.getPosts();
  }

  getPostPage(): any {
    return butterService.page.retrieve('*', 'blog')
      .then((res) => {
        this.postPage = res.data.data;
      });
  }
  getPosts(): any {
    return butterService.post.list({
      page: 1,
      page_size: 10
    }).then((res) => {
      this.posts = res.data.data;
    });
  }
}
