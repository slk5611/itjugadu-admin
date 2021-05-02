import {Component, OnInit, ViewChild} from '@angular/core';
import { SubscriberService } from '../../services/subscriber/subscriber.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {
  // @ts-ignore
  @ViewChild('closeModal') closeModal;
  subscriberData: any = {};
  subscriberMessage: any = [];
  oSubscriber: any = [];
  constructor(private subscriberService: SubscriberService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  this.getAllSubscriber();
  }

  addSubscriber() {
    if (this.subscriberData._id) {
      this.subscriberService.updateSubscriber(this.subscriberData)
        .subscribe(data => {
          this.subscriberMessage = data;
          this.toastr.success(this.subscriberMessage.message);
          this.getAllSubscriber();
        }, error => {
          this.toastr.error(error);
        });
    } else {
      this.subscriberService.addSubscriber(this.subscriberData)
        .subscribe(data => {
          this.subscriberMessage = data;
          this.toastr.success(this.subscriberMessage.message);
          this.getAllSubscriber();
        }, error => {
          this.toastr.error(error);
        });
    }
    this.closePostModal();
  }

  deleteSubscriber(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary subscriber!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.subscriberService.deleteSubscriber(id)
          .subscribe(data => {
            this.subscriberMessage = data;
            Swal.fire(
              'Deleted!',
              'Your imaginary subscriber has been deleted.',
              'success'
            );
            this.toastr.success(this.subscriberMessage.message);
            this.getAllSubscriber();
          }, error => {
            this.toastr.error(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary subscriber is safe :)',
          'error'
        );
      }
    });
  }

  getAllSubscriber() {
    this.spinner.show();
    this.subscriberService.getAllSubscriber()
      .subscribe(data => {
        this.oSubscriber = data;
        this.spinner.hide();
      },
        error => {
        this.subscriberMessage = error;
        });
  }

  updateSubscriber(id) {
    this.subscriberData = this.oSubscriber.find(({_id}) => _id === id);
  }

  closePostModal() {
    this.closeModal.nativeElement.click();
  }
}
