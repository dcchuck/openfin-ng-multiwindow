import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenfinServiceComponent } from './openfin-service.component';

describe('OpenfinServiceComponent', () => {
  let component: OpenfinServiceComponent;
  let fixture: ComponentFixture<OpenfinServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenfinServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenfinServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
