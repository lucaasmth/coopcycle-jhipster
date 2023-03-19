import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../courier.test-samples';

import { CourierFormService } from './courier-form.service';

describe('Courier Form Service', () => {
  let service: CourierFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourierFormService);
  });

  describe('Service methods', () => {
    describe('createCourierFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourierFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lastName: expect.any(Object),
            firstName: expect.any(Object),
            email: expect.any(Object),
            phone: expect.any(Object),
            vehicle: expect.any(Object),
            status: expect.any(Object),
            restaurant: expect.any(Object),
          })
        );
      });

      it('passing ICourier should create a new form with FormGroup', () => {
        const formGroup = service.createCourierFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            lastName: expect.any(Object),
            firstName: expect.any(Object),
            email: expect.any(Object),
            phone: expect.any(Object),
            vehicle: expect.any(Object),
            status: expect.any(Object),
            restaurant: expect.any(Object),
          })
        );
      });
    });

    describe('getCourier', () => {
      it('should return NewCourier for default Courier initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCourierFormGroup(sampleWithNewData);

        const courier = service.getCourier(formGroup) as any;

        expect(courier).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourier for empty Courier initial value', () => {
        const formGroup = service.createCourierFormGroup();

        const courier = service.getCourier(formGroup) as any;

        expect(courier).toMatchObject({});
      });

      it('should return ICourier', () => {
        const formGroup = service.createCourierFormGroup(sampleWithRequiredData);

        const courier = service.getCourier(formGroup) as any;

        expect(courier).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourier should not enable id FormControl', () => {
        const formGroup = service.createCourierFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourier should disable id FormControl', () => {
        const formGroup = service.createCourierFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
