import {Component, OnInit, ViewChild} from '@angular/core';
import { ContactService } from '../../services/contact/contact.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // @ts-ignore
  @ViewChild('closeModal') closeModal;

  contactData: any = {};
  oContact: any = [];
  contactMessage: any = [];
  constructor(private contactService: ContactService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllContact();
  }

  addContact() {
    if (this.contactData._id) {
      this.contactService.updateContact(this.contactData)
        .subscribe(data => {
          this.contactMessage = data;
          this.toastr.success(this.contactMessage.message);
          this.getAllContact();
        }, error => {
          this.toastr.error(error);
        });
    } else {
      this.contactService.addContact(this.contactData)
        .subscribe(data => {
          this.contactMessage = data;
          this.toastr.success(this.contactMessage.message);
          this.getAllContact();
        }, error => {
          this.toastr.error(error);
        });
    }
    this.closeContactModal();
  }

  deleteContact(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary contact!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.contactService.deleteContact(id)
          .subscribe(data => {
            this.contactMessage = data;
            Swal.fire(
              'Deleted!',
              'Your imaginary contact has been deleted.',
              'success'
            );
            this.toastr.success(this.contactMessage.message);
            this.getAllContact();
          }, error => {
            this.toastr.error(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary contact is safe :)',
          'error'
        );
      }
    });
  }

  getAllContact() {
    this.spinner.show();
    this.contactService.getAllContact()
      .subscribe(data => {
        this.oContact = data;
        this.spinner.hide();
      },
        error => {
        this.toastr.error(error);
        });
  }

  updateContact(id) {
    this.contactData = this.oContact.find(({_id}) => _id === id);
  }

  closeContactModal() {
    this.closeModal.nativeElement.click();
  }
}
