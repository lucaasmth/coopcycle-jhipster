import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICourier } from '../courier.model';
import { CourierService } from '../service/courier.service';

@Injectable({ providedIn: 'root' })
export class CourierRoutingResolveService implements Resolve<ICourier | null> {
  constructor(protected service: CourierService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourier | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((courier: HttpResponse<ICourier>) => {
          if (courier.body) {
            return of(courier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
