import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInLoggingInComponent } from './sign-in-logging-in.component';

describe('SignInLoggingInComponent', () => {
  let component: SignInLoggingInComponent;
  let fixture: ComponentFixture<SignInLoggingInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInLoggingInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInLoggingInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
