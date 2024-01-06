import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRegistrationComponent } from './sign-up-registration.component';

describe('SignUpRegistrationComponent', () => {
  let component: SignUpRegistrationComponent;
  let fixture: ComponentFixture<SignUpRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
