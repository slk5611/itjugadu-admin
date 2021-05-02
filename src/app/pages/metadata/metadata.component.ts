import {Component, OnInit, ViewChild} from '@angular/core';
import { MetadataService } from '../../services/metadata/metadata.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {
  // @ts-ignore
  @ViewChild('closeModal') closeModal;

  oMetadata: any = [];
  metadataData: any = {};
  metadataMessage: any = [];
  constructor(private metadataService: MetadataService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllMetadata();
  }

  addMetadata() {
    if (this.metadataData._id) {
      this.metadataService.updateMetadata(this.metadataData)
        .subscribe(data => {
          this.metadataMessage = data;
          this.getAllMetadata();
          this.metadataData = {};
          this.toastr.success(this.metadataMessage.message);
        }, error => {
          this.toastr.error(error);
        });
    } else {
      this.metadataService.addMetadata(this.metadataData)
        .subscribe(data => {
          this.metadataMessage = data;
          this.getAllMetadata();
          this.metadataData = {}
          this.toastr.success(this.metadataMessage.message);
        }, error => {
          this.toastr.error(error);
        });
    }
    this.closeMetadataModal();
  }

  deleteMetadata(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary metadata!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.metadataService.deleteMetadata(id)
          .subscribe(data => {
            this.metadataMessage = data;
            Swal.fire(
              'Deleted!',
              'Your imaginary metadata has been deleted.',
              'success'
            );
            this.toastr.success(this.metadataMessage.message);
            this.getAllMetadata();
          }, error => {
            this.toastr.error(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary metadata is safe :)',
          'error'
        );
      }
    });
  }

  getAllMetadata() {
    this.spinner.show();
    this.metadataService.getAllMetadata()
      .subscribe(data => {
        this.oMetadata = data;
        this.spinner.hide();
      }, error => {
        this.toastr.error(error);
      });
  }

  updateMetadata(id) {
    this.metadataData = this.oMetadata.find(({_id}) => _id === id);
  }

  closeMetadataModal() {
    this.closeModal.nativeElement.click();
  }
}
