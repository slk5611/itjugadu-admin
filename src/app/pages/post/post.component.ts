import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import {FormBuilder, Validators, FormGroup, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { imagePath } from '../../config/constant';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // @ts-ignore
  @ViewChild('closeModal') closeModal;

  error: string;
  uploadError: string;
  submitted = false;

  postForm: FormGroup;

  post: any = {};
  postData: any = [];
  postMessage: any = [];
  imageUrl: any = imagePath;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      id: [''],
      postName: ['', Validators.required],
      postType: ['', Validators.required],
      author: ['', Validators.required],
      activePost: [''],
      verifiedPost: [''],
      metaTag: ['', Validators.required],
      blog: ['', Validators.required],
      thumbnailImage: ['', Validators.required],
      description: ['', Validators.required],
      readingTime: ['', Validators.required],
    });
    this.getAllPost();
  }

  // convenience getter for easy access to form fields
  get f() { return this.postForm.controls; }

  getAllPost() {
    this.spinner.show();
    this.postService.getAllPost()
      .subscribe(data => {
        this.postData = data;
        this.spinner.hide();
      });
  }

  addPost() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('postName', this.postForm.get('postName').value);
    formData.append('postType', this.postForm.get('postType').value);
    formData.append('author', this.postForm.get('author').value);
    formData.append('activePost', this.postForm.get('activePost').value);
    formData.append('verifiedPost', this.postForm.get('verifiedPost').value);
    formData.append('metaTag', this.postForm.get('metaTag').value);
    formData.append('blog', this.postForm.get('blog').value);
    formData.append('thumbnailImage', this.postForm.get('thumbnailImage').value);
    formData.append('description', this.postForm.get('description').value);
    formData.append('readingTime', this.postForm.get('readingTime').value);
    const id = this.postForm.get('id').value;
    if (id) {
      this.postService.updatePost(id, formData)
        .subscribe(data => {
          this.postMessage = data;
          this.toastr.success(this.postMessage.message);
          this.getAllPost();
          this.closePostModal();
        },
          error => {
            this.toastr.error(error);
          });
    } else {
      this.postService.addPost(formData)
        .subscribe(data => {
          this.postMessage = data;
          this.toastr.success(this.postMessage.message);
          this.getAllPost();
          this.closePostModal();
        },
          error => {
            this.toastr.error(error);
          });
    }
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postForm.get('thumbnailImage').setValue(file);
    }
  }

  deletePost(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.postService.deletePost(id)
          .subscribe(data => {
              this.postMessage = data;
              Swal.fire(
                'Deleted!',
                'Your imaginary post has been deleted.',
                'success'
              );
              this.toastr.success(this.postMessage.message)
              this.getAllPost();
            },
            error => {
              this.toastr.error(error);
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary post is safe :)',
          'error'
        );
      }
    });
  }

  commentByPost(id) {
    // Using @#$% is only for security
    this.router.navigate(['/comment/' + '@#$%' + id]);
  }

  closePostModal() {
    this.closeModal.nativeElement.click();
  }
  updatePost(id) {
    this.post = this.postData.find(({_id}) => _id === id);
    this.postForm = this.fb.group({
      id: this.post._id,
      postName: this.post.postName,
      postType: this.post.postType,
      author: this.post.author,
      activePost: this.post.activePost,
      verifiedPost: this.post.verifiedPost,
      metaTag: this.post.metaTag,
      blog: this.post.blog,
      thumbnailImage: this.post.thumbnailImage,
      description: this.post.description,
      readingTime: this.post.readingTime,
    });
    this.onFileSelected(this.post.thumbnailImage);
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    ),

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };

  }
}

class UploadAdapter {
  private loader: any;
  constructor( loader ) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then( file => new Promise( ( resolve, reject ) => {
        const myReader = new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        };

        myReader.readAsDataURL(file);
      }));
  }
}
