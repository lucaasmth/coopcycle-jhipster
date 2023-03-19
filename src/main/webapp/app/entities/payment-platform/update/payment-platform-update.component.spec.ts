import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentPlatformFormService } from './payment-platform-form.service';
import { PaymentPlatformService } from '../service/payment-platform.service';
import { IPaymentPlatform } from '../payment-platform.model';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';

import { PaymentPlatformUpdateComponent } from './payment-platform-update.component';

describe('PaymentPlatform Management Update Component', () => {
  let comp: PaymentPlatformUpdateComponent;
  let fixture: ComponentFixture<PaymentPlatformUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentPlatformFormService: PaymentPlatformFormService;
  let paymentPlatformService: PaymentPlatformService;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentPlatformUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PaymentPlatformUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentPlatformUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentPlatformFormService = TestBed.inject(PaymentPlatformFormService);
    paymentPlatformService = TestBed.inject(PaymentPlatformService);
    orderService = TestBed.inject(OrderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Order query and add missing value', () => {
      const paymentPlatform: IPaymentPlatform = { id: 456 };
      const order: IOrder = { id: 32734 };
      paymentPlatform.order = order;

      const orderCollection: IOrder[] = [{ id: 16385 }];
      jest.spyOn(orderService, 'query').mockReturnValue(of(new HttpResponse({ body: orderCollection })));
      const additionalOrders = [order];
      const expectedCollection: IOrder[] = [...additionalOrders, ...orderCollection];
      jest.spyOn(orderService, 'addOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paymentPlatform });
      comp.ngOnInit();

      expect(orderService.query).toHaveBeenCalled();
      expect(orderService.addOrderToCollectionIfMissing).toHaveBeenCalledWith(
        orderCollection,
        ...additionalOrders.map(expect.objectContaining)
      );
      expect(comp.ordersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paymentPlatform: IPaymentPlatform = { id: 456 };
      const order: IOrder = { id: 47726 };
      paymentPlatform.order = order;

      activatedRoute.data = of({ paymentPlatform });
      comp.ngOnInit();

      expect(comp.ordersSharedCollection).toContain(order);
      expect(comp.paymentPlatform).toEqual(paymentPlatform);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentPlatform>>();
      const paymentPlatform = { id: 123 };
      jest.spyOn(paymentPlatformFormService, 'getPaymentPlatform').mockReturnValue(paymentPlatform);
      jest.spyOn(paymentPlatformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentPlatform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentPlatform }));
      saveSubject.complete();

      // THEN
      expect(paymentPlatformFormService.getPaymentPlatform).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentPlatformService.update).toHaveBeenCalledWith(expect.objectContaining(paymentPlatform));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentPlatform>>();
      const paymentPlatform = { id: 123 };
      jest.spyOn(paymentPlatformFormService, 'getPaymentPlatform').mockReturnValue({ id: null });
      jest.spyOn(paymentPlatformService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentPlatform: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paymentPlatform }));
      saveSubject.complete();

      // THEN
      expect(paymentPlatformFormService.getPaymentPlatform).toHaveBeenCalled();
      expect(paymentPlatformService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaymentPlatform>>();
      const paymentPlatform = { id: 123 };
      jest.spyOn(paymentPlatformService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paymentPlatform });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentPlatformService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareOrder', () => {
      it('Should forward to orderService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(orderService, 'compareOrder');
        comp.compareOrder(entity, entity2);
        expect(orderService.compareOrder).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
