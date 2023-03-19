import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CourierFormService, CourierFormGroup } from './courier-form.service';
import { ICourier } from '../courier.model';
import { CourierService } from '../service/courier.service';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/service/restaurant.service';
import { VehicleType } from 'app/entities/enumerations/vehicle-type.model';

@Component({
  selector: 'jhi-courier-update',
  templateUrl: './courier-update.component.html',
})
export class CourierUpdateComponent implements OnInit {
  isSaving = false;
  courier: ICourier | null = null;
  vehicleTypeValues = Object.keys(VehicleType);

  restaurantsSharedCollection: IRestaurant[] = [];

  editForm: CourierFormGroup = this.courierFormService.createCourierFormGroup();

  constructor(
    protected courierService: CourierService,
    protected courierFormService: CourierFormService,
    protected restaurantService: RestaurantService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareRestaurant = (o1: IRestaurant | null, o2: IRestaurant | null): boolean => this.restaurantService.compareRestaurant(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courier }) => {
      this.courier = courier;
      if (courier) {
        this.updateForm(courier);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courier = this.courierFormService.getCourier(this.editForm);
    if (courier.id !== null) {
      this.subscribeToSaveResponse(this.courierService.update(courier));
    } else {
      this.subscribeToSaveResponse(this.courierService.create(courier));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourier>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(courier: ICourier): void {
    this.courier = courier;
    this.courierFormService.resetForm(this.editForm, courier);

    this.restaurantsSharedCollection = this.restaurantService.addRestaurantToCollectionIfMissing<IRestaurant>(
      this.restaurantsSharedCollection,
      courier.restaurant
    );
  }

  protected loadRelationshipsOptions(): void {
    this.restaurantService
      .query()
      .pipe(map((res: HttpResponse<IRestaurant[]>) => res.body ?? []))
      .pipe(
        map((restaurants: IRestaurant[]) =>
          this.restaurantService.addRestaurantToCollectionIfMissing<IRestaurant>(restaurants, this.courier?.restaurant)
        )
      )
      .subscribe((restaurants: IRestaurant[]) => (this.restaurantsSharedCollection = restaurants));
  }
}
