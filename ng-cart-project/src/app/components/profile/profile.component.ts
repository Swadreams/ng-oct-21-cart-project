import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editDetails = false;
  editAddress = false;
  showLoader = false;
  success = '';
  error = '';
  // profile: any = {
  //   address: [
  //     {
  //       addressLine1: 'Line 1',
  //       addressLine2: 'Line2',
  //       city: 'Pune',
  //       state: 'MAH',
  //       title: 'Home',
  //       zip: '435245',
  //       _id: '61973be95ed5ef00099f2b6a',
  //     },
  //     {
  //       addressLine1: 'Line 1',
  //       addressLine2: 'Line2',
  //       city: 'Pune',
  //       state: 'MAH',
  //       title: 'Office',
  //       zip: '435245',
  //       _id: '61973be95ed5ef00099f2b6a',
  //     },
  //   ],
  //   email: 'test@test.com',
  //   name: 'Anonymous User',
  //   phone: '0000000000',
  // };
  profile: any;

  detailsForm: any;
  addressForm = this.fb.group({
    address: this.fb.array([]),
  });

  address = {
    title: ['', [Validators.required]],
    addressLine1: ['', [Validators.maxLength(20)]],
    addressLine2: ['', [Validators.maxLength(20)]],
    city: ['', [Validators.maxLength(10), Validators.required]],
    zip: ['', [Validators.maxLength(6), Validators.required]],
    state: ['', [Validators.maxLength(15), Validators.required]],
  };

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.showLoader = true;
    this.authService
      .getProfile()
      .subscribe(
        (response) => {
          this.profile = response;
        },
        (error) => console.log(error)
      )
      .add(() => {
        this.showLoader = false;
      });
  }

  createDetailsForm(): void {
    this.detailsForm = this.fb.group({
      name: [this.profile.name, [Validators.required]],
      phone: [
        this.profile.phone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  addAddressForm() {
    const address = this.addressForm.controls.address as FormArray;
    address.push(
      this.fb.group({
        title: ['', [Validators.required]],
        addressLine1: ['', [Validators.maxLength(20)]],
        addressLine2: ['', [Validators.maxLength(20)]],
        city: ['', [Validators.maxLength(10), Validators.required]],
        zip: ['', [Validators.maxLength(6), Validators.required]],
        state: ['', [Validators.maxLength(15), Validators.required]],
      })
    );

    this.editAddress = true;
  }

  toggleDetailsEdit() {
    this.editDetails = !this.editDetails;

    if (this.editDetails) {
      this.createDetailsForm();
    }
  }

  toggleAddressEdit() {
    this.editAddress = !this.editAddress;
  }

  saveDetails() {
    this.showLoader = true;
    this.authService
      .updateProfile(this.detailsForm.value)
      .subscribe(
        () => {
          this.toggleDetailsEdit();
          this.fetchProfile();
          this.success = 'Details updated successfully.';
        },
        () => {
          this.error =
            'Error occurred while updating details. Please try after some time.';
        }
      )
      .add(() => {
        this.removeMessage();
        this.showLoader = false;
      });
  }

  removeMessage() {
    setTimeout(() => {
      this.success = '';
      this.error = '';
    }, 2000);
  }

  saveAddress() {
    console.log(this.addressForm.value);
    this.showLoader = true;
    this.authService
      .updateAddress(this.addressForm.value)
      .subscribe(
        () => {
          this.discardAddress();
          this.toggleAddressEdit();
          this.fetchProfile();
          this.success = 'Address updated successfully.';
        },
        () => {
          this.error =
            'Error occurred while updating address. Please try after some time.';
        }
      )
      .add(() => {
        this.removeMessage();
        this.showLoader = false;
      });
  }

  discardAddress() {
    // this.addressForm.controls.address.push(new FormGroup({}));
    (this.addressForm.controls.address as FormArray).clear();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  daleteAddress(id: string) {
    this.showLoader = true;
    this.authService
      .removeAddress(id)
      .subscribe(
        () => {
          this.success = 'Address deleted successfully.';
          this.fetchProfile();
        },
        () => {
          this.error =
            'Error occurred while deleting address. Please try after some time.';
        }
      )
      .add(() => {
        this.removeMessage();
        this.showLoader = false;
      });
  }
}
