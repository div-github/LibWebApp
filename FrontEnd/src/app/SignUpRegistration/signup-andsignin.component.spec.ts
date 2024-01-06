import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupANDSigninComponent } from './signup-andsignin.component';

describe('SignupANDSigninComponent', () => {
  let component: SignupANDSigninComponent;
  let fixture: ComponentFixture<SignupANDSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupANDSigninComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupANDSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
