import { Component, OnInit } from '@angular/core';
import { butterService } from '../../services/butterCMS.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  /* Array needed to type match ButterCMS call */
  postPage: any = {
    fields: []
  };

  posts: any[];

  /* Variable to indicate start point for pagination */
  p: number = 1;

  constructor() { }

  ngOnInit() {
    this.getPostPage();
    this.getPosts();
  }

  /* Retrieve page content from ButterCMS */
  getPostPage(): any {
    return butterService.page.retrieve('*', 'blog')
      .then((res) => {
        this.postPage = res.data.data;
      });
  }
  /* Retrive post content from ButterCMS */
  getPosts(): any {
    return butterService.post.list({
      /* Start with the first page and return no more than 10 at a time */
      page: 1,
      page_size: 10
    }).then((res) => {
      this.posts = res.data.data;
    });
  }
}
