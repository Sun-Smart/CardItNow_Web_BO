import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadernewComponent } from './headernew.component';

describe('HeadernewComponent', () => {
  let component: HeadernewComponent;
  let fixture: ComponentFixture<HeadernewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadernewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadernewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
