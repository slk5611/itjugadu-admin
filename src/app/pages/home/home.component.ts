import {Component, OnInit} from '@angular/core';
import {HomeService} from '../../services/home/home.service';
import {PostService} from '../../services/post/post.service';
import { imagePath } from '../../config/constant';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  oCount: any = [];
  oPostData: any = [];
  imageUrl: any = imagePath;

  constructor(private homeService: HomeService,
              private postService: PostService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getPostCount();
    this.getAllPost();
  }

  getPostCount() {
    this.homeService.getDashboardCount()
      .subscribe(data => {
        this.oCount = data;
      }, error => {
        this.oCount = error;
      });
  }

  getAllPost() {
    this.spinner.show();
    this.postService.getAllPost()
      .subscribe(data => {
        this.oPostData = data;
        this.spinner.hide();
      });
  }
}
