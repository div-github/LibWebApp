import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWithCopywriteAndContactComponent } from './footer-with-copywrite-and-contact.component';

describe('FooterWithCopywriteAndContactComponent', () => {
  let component: FooterWithCopywriteAndContactComponent;
  let fixture: ComponentFixture<FooterWithCopywriteAndContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterWithCopywriteAndContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterWithCopywriteAndContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
