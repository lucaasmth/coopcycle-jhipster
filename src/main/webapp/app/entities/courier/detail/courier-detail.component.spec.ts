import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CourierDetailComponent } from './courier-detail.component';

describe('Courier Management Detail Component', () => {
  let comp: CourierDetailComponent;
  let fixture: ComponentFixture<CourierDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ courier: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CourierDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CourierDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load courier on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.courier).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
