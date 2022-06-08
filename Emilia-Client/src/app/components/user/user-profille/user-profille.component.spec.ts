import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilleComponent } from './user-profille.component';

describe('UserProfilleComponent', () => {
  let component: UserProfilleComponent;
  let fixture: ComponentFixture<UserProfilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
