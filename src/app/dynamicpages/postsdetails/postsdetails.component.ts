import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { butterService } from '../../_services/butterCMS.service';

@Component({
  selector: 'app-postsdetails',
  templateUrl: './postsdetails.component.html',
  styleUrls: ['./postsdetails.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsdetailsComponent implements OnInit {

  protected slug$: Observable<string>;

  constructor(protected route: ActivatedRoute, protected router: Router) { }

  post: any = {
    data: []
  };

  ngOnInit() {
    this.getBlogPost();
  }

  /* retrieve information for single blog post */
  getBlogPost(): void {
    this.slug$ = this.route.paramMap
            .pipe(
                map(params => (params.get('slug')))
            );

    this.slug$.pipe(
        take(1))
        .subscribe(slug => {
            butterService.post.retrieve(slug)
                .then((res) => {
                        this.post = res.data;
                }).catch((res) => {
                console.log(res);
               });
         });
  }
}
