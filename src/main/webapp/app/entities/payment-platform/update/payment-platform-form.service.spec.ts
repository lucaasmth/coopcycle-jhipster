import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../payment-platform.test-samples';

import { PaymentPlatformFormService } from './payment-platform-form.service';

describe('PaymentPlatform Form Service', () => {
  let service: PaymentPlatformFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentPlatformFormService);
  });

  describe('Service methods', () => {
    describe('createPaymentPlatformFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPaymentPlatformFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amount: expect.any(Object),
            paymentType: expect.any(Object),
            order: expect.any(Object),
          })
        );
      });

      it('passing IPaymentPlatform should create a new form with FormGroup', () => {
        const formGroup = service.createPaymentPlatformFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amount: expect.any(Object),
            paymentType: expect.any(Object),
            order: expect.any(Object),
          })
        );
      });
    });

    describe('getPaymentPlatform', () => {
      it('should return NewPaymentPlatform for default PaymentPlatform initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPaymentPlatformFormGroup(sampleWithNewData);

        const paymentPlatform = service.getPaymentPlatform(formGroup) as any;

        expect(paymentPlatform).toMatchObject(sampleWithNewData);
      });

      it('should return NewPaymentPlatform for empty PaymentPlatform initial value', () => {
        const formGroup = service.createPaymentPlatformFormGroup();

        const paymentPlatform = service.getPaymentPlatform(formGroup) as any;

        expect(paymentPlatform).toMatchObject({});
      });

      it('should return IPaymentPlatform', () => {
        const formGroup = service.createPaymentPlatformFormGroup(sampleWithRequiredData);

        const paymentPlatform = service.getPaymentPlatform(formGroup) as any;

        expect(paymentPlatform).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPaymentPlatform should not enable id FormControl', () => {
        const formGroup = service.createPaymentPlatformFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPaymentPlatform should disable id FormControl', () => {
        const formGroup = service.createPaymentPlatformFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
