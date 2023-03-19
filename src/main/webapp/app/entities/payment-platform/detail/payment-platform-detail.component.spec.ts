import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentPlatformDetailComponent } from './payment-platform-detail.component';

describe('PaymentPlatform Management Detail Component', () => {
  let comp: PaymentPlatformDetailComponent;
  let fixture: ComponentFixture<PaymentPlatformDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPlatformDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ paymentPlatform: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PaymentPlatformDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PaymentPlatformDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load paymentPlatform on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.paymentPlatform).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
