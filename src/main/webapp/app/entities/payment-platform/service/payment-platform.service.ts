import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPaymentPlatform, NewPaymentPlatform } from '../payment-platform.model';

export type PartialUpdatePaymentPlatform = Partial<IPaymentPlatform> & Pick<IPaymentPlatform, 'id'>;

export type EntityResponseType = HttpResponse<IPaymentPlatform>;
export type EntityArrayResponseType = HttpResponse<IPaymentPlatform[]>;

@Injectable({ providedIn: 'root' })
export class PaymentPlatformService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/payment-platforms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(paymentPlatform: NewPaymentPlatform): Observable<EntityResponseType> {
    return this.http.post<IPaymentPlatform>(this.resourceUrl, paymentPlatform, { observe: 'response' });
  }

  update(paymentPlatform: IPaymentPlatform): Observable<EntityResponseType> {
    return this.http.put<IPaymentPlatform>(`${this.resourceUrl}/${this.getPaymentPlatformIdentifier(paymentPlatform)}`, paymentPlatform, {
      observe: 'response',
    });
  }

  partialUpdate(paymentPlatform: PartialUpdatePaymentPlatform): Observable<EntityResponseType> {
    return this.http.patch<IPaymentPlatform>(`${this.resourceUrl}/${this.getPaymentPlatformIdentifier(paymentPlatform)}`, paymentPlatform, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentPlatform>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentPlatform[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPaymentPlatformIdentifier(paymentPlatform: Pick<IPaymentPlatform, 'id'>): number {
    return paymentPlatform.id;
  }

  comparePaymentPlatform(o1: Pick<IPaymentPlatform, 'id'> | null, o2: Pick<IPaymentPlatform, 'id'> | null): boolean {
    return o1 && o2 ? this.getPaymentPlatformIdentifier(o1) === this.getPaymentPlatformIdentifier(o2) : o1 === o2;
  }

  addPaymentPlatformToCollectionIfMissing<Type extends Pick<IPaymentPlatform, 'id'>>(
    paymentPlatformCollection: Type[],
    ...paymentPlatformsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const paymentPlatforms: Type[] = paymentPlatformsToCheck.filter(isPresent);
    if (paymentPlatforms.length > 0) {
      const paymentPlatformCollectionIdentifiers = paymentPlatformCollection.map(
        paymentPlatformItem => this.getPaymentPlatformIdentifier(paymentPlatformItem)!
      );
      const paymentPlatformsToAdd = paymentPlatforms.filter(paymentPlatformItem => {
        const paymentPlatformIdentifier = this.getPaymentPlatformIdentifier(paymentPlatformItem);
        if (paymentPlatformCollectionIdentifiers.includes(paymentPlatformIdentifier)) {
          return false;
        }
        paymentPlatformCollectionIdentifiers.push(paymentPlatformIdentifier);
        return true;
      });
      return [...paymentPlatformsToAdd, ...paymentPlatformCollection];
    }
    return paymentPlatformCollection;
  }
}
