import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPaymentPlatform } from '../payment-platform.model';
import { PaymentPlatformService } from '../service/payment-platform.service';

@Injectable({ providedIn: 'root' })
export class PaymentPlatformRoutingResolveService implements Resolve<IPaymentPlatform | null> {
  constructor(protected service: PaymentPlatformService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentPlatform | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((paymentPlatform: HttpResponse<IPaymentPlatform>) => {
          if (paymentPlatform.body) {
            return of(paymentPlatform.body);
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
