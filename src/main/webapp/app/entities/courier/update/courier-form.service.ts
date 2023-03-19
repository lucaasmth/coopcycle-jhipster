import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICourier, NewCourier } from '../courier.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourier for edit and NewCourierFormGroupInput for create.
 */
type CourierFormGroupInput = ICourier | PartialWithRequiredKeyOf<NewCourier>;

type CourierFormDefaults = Pick<NewCourier, 'id'>;

type CourierFormGroupContent = {
  id: FormControl<ICourier['id'] | NewCourier['id']>;
  lastName: FormControl<ICourier['lastName']>;
  firstName: FormControl<ICourier['firstName']>;
  email: FormControl<ICourier['email']>;
  phone: FormControl<ICourier['phone']>;
  vehicle: FormControl<ICourier['vehicle']>;
  status: FormControl<ICourier['status']>;
  restaurant: FormControl<ICourier['restaurant']>;
};

export type CourierFormGroup = FormGroup<CourierFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourierFormService {
  createCourierFormGroup(courier: CourierFormGroupInput = { id: null }): CourierFormGroup {
    const courierRawValue = {
      ...this.getFormDefaults(),
      ...courier,
    };
    return new FormGroup<CourierFormGroupContent>({
      id: new FormControl(
        { value: courierRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      lastName: new FormControl(courierRawValue.lastName, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      }),
      firstName: new FormControl(courierRawValue.firstName, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      }),
      email: new FormControl(courierRawValue.email, {
        validators: [Validators.required, Validators.pattern('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')],
      }),
      phone: new FormControl(courierRawValue.phone, {
        validators: [Validators.required, Validators.pattern('^\\+[1-9]\\d{1,14}$')],
      }),
      vehicle: new FormControl(courierRawValue.vehicle),
      status: new FormControl(courierRawValue.status),
      restaurant: new FormControl(courierRawValue.restaurant),
    });
  }

  getCourier(form: CourierFormGroup): ICourier | NewCourier {
    return form.getRawValue() as ICourier | NewCourier;
  }

  resetForm(form: CourierFormGroup, courier: CourierFormGroupInput): void {
    const courierRawValue = { ...this.getFormDefaults(), ...courier };
    form.reset(
      {
        ...courierRawValue,
        id: { value: courierRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CourierFormDefaults {
    return {
      id: null,
    };
  }
}
