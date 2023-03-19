import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClient, NewClient } from '../client.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClient for edit and NewClientFormGroupInput for create.
 */
type ClientFormGroupInput = IClient | PartialWithRequiredKeyOf<NewClient>;

type ClientFormDefaults = Pick<NewClient, 'id'>;

type ClientFormGroupContent = {
  id: FormControl<IClient['id'] | NewClient['id']>;
  lastName: FormControl<IClient['lastName']>;
  firstName: FormControl<IClient['firstName']>;
  email: FormControl<IClient['email']>;
  phone: FormControl<IClient['phone']>;
  address: FormControl<IClient['address']>;
  restaurant: FormControl<IClient['restaurant']>;
};

export type ClientFormGroup = FormGroup<ClientFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  createClientFormGroup(client: ClientFormGroupInput = { id: null }): ClientFormGroup {
    const clientRawValue = {
      ...this.getFormDefaults(),
      ...client,
    };
    return new FormGroup<ClientFormGroupContent>({
      id: new FormControl(
        { value: clientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      lastName: new FormControl(clientRawValue.lastName, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      }),
      firstName: new FormControl(clientRawValue.firstName, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      }),
      email: new FormControl(clientRawValue.email, {
        validators: [Validators.required, Validators.pattern('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')],
      }),
      phone: new FormControl(clientRawValue.phone, {
        validators: [Validators.required, Validators.pattern('^\\+[1-9]\\d{1,14}$')],
      }),
      address: new FormControl(clientRawValue.address, {
        validators: [Validators.required],
      }),
      restaurant: new FormControl(clientRawValue.restaurant),
    });
  }

  getClient(form: ClientFormGroup): IClient | NewClient {
    return form.getRawValue() as IClient | NewClient;
  }

  resetForm(form: ClientFormGroup, client: ClientFormGroupInput): void {
    const clientRawValue = { ...this.getFormDefaults(), ...client };
    form.reset(
      {
        ...clientRawValue,
        id: { value: clientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClientFormDefaults {
    return {
      id: null,
    };
  }
}
