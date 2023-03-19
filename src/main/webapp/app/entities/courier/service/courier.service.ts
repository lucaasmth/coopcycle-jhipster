import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICourier, NewCourier } from '../courier.model';

export type PartialUpdateCourier = Partial<ICourier> & Pick<ICourier, 'id'>;

export type EntityResponseType = HttpResponse<ICourier>;
export type EntityArrayResponseType = HttpResponse<ICourier[]>;

@Injectable({ providedIn: 'root' })
export class CourierService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/couriers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(courier: NewCourier): Observable<EntityResponseType> {
    return this.http.post<ICourier>(this.resourceUrl, courier, { observe: 'response' });
  }

  update(courier: ICourier): Observable<EntityResponseType> {
    return this.http.put<ICourier>(`${this.resourceUrl}/${this.getCourierIdentifier(courier)}`, courier, { observe: 'response' });
  }

  partialUpdate(courier: PartialUpdateCourier): Observable<EntityResponseType> {
    return this.http.patch<ICourier>(`${this.resourceUrl}/${this.getCourierIdentifier(courier)}`, courier, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICourier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICourier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCourierIdentifier(courier: Pick<ICourier, 'id'>): number {
    return courier.id;
  }

  compareCourier(o1: Pick<ICourier, 'id'> | null, o2: Pick<ICourier, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourierIdentifier(o1) === this.getCourierIdentifier(o2) : o1 === o2;
  }

  addCourierToCollectionIfMissing<Type extends Pick<ICourier, 'id'>>(
    courierCollection: Type[],
    ...couriersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const couriers: Type[] = couriersToCheck.filter(isPresent);
    if (couriers.length > 0) {
      const courierCollectionIdentifiers = courierCollection.map(courierItem => this.getCourierIdentifier(courierItem)!);
      const couriersToAdd = couriers.filter(courierItem => {
        const courierIdentifier = this.getCourierIdentifier(courierItem);
        if (courierCollectionIdentifiers.includes(courierIdentifier)) {
          return false;
        }
        courierCollectionIdentifiers.push(courierIdentifier);
        return true;
      });
      return [...couriersToAdd, ...courierCollection];
    }
    return courierCollection;
  }
}
