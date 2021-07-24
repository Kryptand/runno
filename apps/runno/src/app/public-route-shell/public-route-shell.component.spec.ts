import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRouteShellComponent } from './public-route-shell.component';

describe('PublicRouteShellComponent', () => {
  let component: PublicRouteShellComponent;
  let fixture: ComponentFixture<PublicRouteShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicRouteShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRouteShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
