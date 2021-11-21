import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  success = '';
  error = '';
  isLoading = false;
  profile: any;
  // profile = {
  //   address: [],
  //   email: 'testuser1@gmail.com',
  //   name: 'Anonymous User',
  //   phone: '0000000000',
  // };

  editAddress = false;
  addressForm = new FormGroup({
    address: new FormArray([]),
  });

  editDetails = false;
  detailsForm = new FormGroup({});

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  createDetailsForm() {
    this.detailsForm = this.fb.group({
      name: [this.profile.name, Validators.required],
      phone: [this.profile.phone, Validators.required],
    });
  }

  toggleDetails() {
    this.editDetails = !this.editDetails;

    if (this.editDetails) {
      this.createDetailsForm();
    }
  }

  updateProfile() {
    this.isLoading = true;
    this.authService
      .updateProfile(this.detailsForm.value)
      .subscribe(
        () => {
          this.editDetails = false;
          this.getUserProfile();
          this.success = 'Profile details updated successfully.';
          setTimeout(() => {
            this.success = '';
          }, 2000);
        },
        () => {
          this.error = 'Can not update profile at the moment.';
          setTimeout(() => {
            this.success = '';
          }, 2000);
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  getUserProfile() {
    this.isLoading = true;
    this.authService
      .getProfile()
      .subscribe(
        (response) => {
          console.log(response);
          this.profile = response;
        },
        (error) => console.log(error)
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  toggleAddress() {
    this.editAddress = !this.editAddress;
  }

  createAddressForm() {
    const address = this.addressForm.controls.address as FormArray;

    address.controls.push(
      this.fb.group({
        title: ['', [Validators.required, Validators.minLength(4)]],
        addressLine1: '',
        addressLine2: '',
        city: ['', [Validators.required, Validators.minLength(3)]],
        zip: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
        state: ['', [Validators.required, Validators.minLength(3)]],
      })
    );
    console.log(this.addressForm);
  }

  showAddressForm() {
    this.editAddress = true;
    this.createAddressForm();
  }

  addAddress() {
    console.log(this.addressForm.value);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
