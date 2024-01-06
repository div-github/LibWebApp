import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBookChildScannerComponent } from './issue-book-child-scanner.component';

describe('IssueBookChildScannerComponent', () => {
  let component: IssueBookChildScannerComponent;
  let fixture: ComponentFixture<IssueBookChildScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueBookChildScannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueBookChildScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
