import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authSerice: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authSerice = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetch profile should return profile data', () => {
    spyOn(authSerice, 'getProfile').and.returnValue(of({}));
    component.fetchProfile();
    expect(component.profile).toBeDefined();
  });

  it('fetch profile should return errro', () => {
    spyOn(authSerice, 'getProfile').and.returnValue(
      throwError('error occurrd')
    );
    component.fetchProfile();
    expect(component.profile).toBeUndefined();
  });

  it('should create details forms', () => {
    component.profile = {
      phone: '34534564236543',
      name: 'test',
    };
    component.createDetailsForm();
    expect(component.detailsForm).toBeDefined();
  });

  it('should create details forms', () => {
    component.addAddressForm();
    expect(
      (component.addressForm.controls.address as FormArray).length
    ).toBeGreaterThan(0);
  });

  it('shuld show edit details on click of edit button', () => {
    console.log('check here');
    component.showLoader = false;
    component.profile = {
      address: [
        {
          ddressLine1: 'Lane 1',
          addressLine2: 'MG Road',
          city: 'Pune',
          state: 'Maharashtra',
          title: 'Home',
          zip: '112220',
          _id: '61a19d57f709230009c32106',
        },
      ],
      email: 'testuser1@gmail.com',
      name: 'Sahil Lastname',
      phone: '987654373',
      _id: '619884504638e40008ed7145',
    };
    fixture.detectChanges();
    const editButton =
      fixture.debugElement.nativeElement.querySelectorAll('button')[0];
    editButton.click();
  });

  it('should save details on click of save function', () => {
    component.profile = {
      phone: '34534564236543',
      name: 'test',
    };
    component.createDetailsForm();
    component.detailsForm.value = { phone: '1234', name: 'abc' };
    spyOn(authSerice, 'updateProfile').and.returnValue(of({}));
    component.saveDetails();
    expect(component.success).toContain('successfully');
  });

  it('should throw error on saving details', () => {
    component.profile = {
      phone: '34534564236543',
      name: 'test',
    };
    component.createDetailsForm();
    component.detailsForm.value = { phone: '1234', name: 'abc' };
    spyOn(authSerice, 'updateProfile').and.returnValue(throwError('error'));
    component.saveDetails();
    expect(component.showLoader).toBeFalse();
  });

  it('should save address on click of save function', () => {
    component.showLoader = false;
    component.profile = {
      address: [
        {
          ddressLine1: 'Lane 1',
          addressLine2: 'MG Road',
          city: 'Pune',
          state: 'Maharashtra',
          title: 'Home',
          zip: '112220',
          _id: '61a19d57f709230009c32106',
        },
      ],
      email: 'testuser1@gmail.com',
      name: 'Sahil Lastname',
      phone: '987654373',
      _id: '619884504638e40008ed7145',
    };
    component.addAddressForm();
    component.addressForm.value.address = [
      {
        ddressLine1: 'Lane 1',
        addressLine2: 'MG Road',
        city: 'Pune',
        state: 'Maharashtra',
        title: 'Home',
        zip: '112220',
        _id: '61a19d57f709230009c32106',
      },
    ];
    spyOn(authSerice, 'updateAddress').and.returnValue(of({}));
    component.saveAddress();
    expect(component.success).toContain('successfully');
  });
});
