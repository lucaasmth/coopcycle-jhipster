import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PaymentPlatformService } from '../service/payment-platform.service';

import { PaymentPlatformComponent } from './payment-platform.component';

describe('PaymentPlatform Management Component', () => {
  let comp: PaymentPlatformComponent;
  let fixture: ComponentFixture<PaymentPlatformComponent>;
  let service: PaymentPlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'payment-platform', component: PaymentPlatformComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [PaymentPlatformComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(PaymentPlatformComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentPlatformComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PaymentPlatformService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.paymentPlatforms?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to paymentPlatformService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPaymentPlatformIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPaymentPlatformIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
