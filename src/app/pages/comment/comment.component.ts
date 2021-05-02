import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  postId: any = '';
  oComment: any = [];
  commentMessage: any = '';
  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const data = params.id;
      this.postId = data.substr(data.length - 24);
      this.getCommentByPost(this.postId);
    });
  }

  getCommentByPost(id) {
    this.spinner.show();
    this.postService.getCommentByPost(id).subscribe(data => {
      this.oComment = data;
      this.spinner.hide();
    }, error => {
      this.oComment = error;
    });
  }

  deleteComment(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary comment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.postService.deleteComment(id)
          .subscribe(data => {
              this.commentMessage = data;
              Swal.fire(
                'Deleted!',
                'Your imaginary comment has been deleted.',
                'success'
              );
              this.toastr.success(this.commentMessage.message)
              this.getCommentByPost(this.postId);
            },
            error => {
              this.toastr.error(error);
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary comment is safe :)',
          'error'
        );
      }
    });
  }
}
