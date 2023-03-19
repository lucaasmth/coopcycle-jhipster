import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CourierFormService } from './courier-form.service';
import { CourierService } from '../service/courier.service';
import { ICourier } from '../courier.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/service/restaurant.service';

import { CourierUpdateComponent } from './courier-update.component';

describe('Courier Management Update Component', () => {
  let comp: CourierUpdateComponent;
  let fixture: ComponentFixture<CourierUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courierFormService: CourierFormService;
  let courierService: CourierService;
  let restaurantService: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CourierUpdateComponent],
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
      .overrideTemplate(CourierUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourierUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courierFormService = TestBed.inject(CourierFormService);
    courierService = TestBed.inject(CourierService);
    restaurantService = TestBed.inject(RestaurantService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Restaurant query and add missing value', () => {
      const courier: ICourier = { id: 456 };
      const restaurant: IRestaurant = { id: 71939 };
      courier.restaurant = restaurant;

      const restaurantCollection: IRestaurant[] = [{ id: 83383 }];
      jest.spyOn(restaurantService, 'query').mockReturnValue(of(new HttpResponse({ body: restaurantCollection })));
      const additionalRestaurants = [restaurant];
      const expectedCollection: IRestaurant[] = [...additionalRestaurants, ...restaurantCollection];
      jest.spyOn(restaurantService, 'addRestaurantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courier });
      comp.ngOnInit();

      expect(restaurantService.query).toHaveBeenCalled();
      expect(restaurantService.addRestaurantToCollectionIfMissing).toHaveBeenCalledWith(
        restaurantCollection,
        ...additionalRestaurants.map(expect.objectContaining)
      );
      expect(comp.restaurantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const courier: ICourier = { id: 456 };
      const restaurant: IRestaurant = { id: 37911 };
      courier.restaurant = restaurant;

      activatedRoute.data = of({ courier });
      comp.ngOnInit();

      expect(comp.restaurantsSharedCollection).toContain(restaurant);
      expect(comp.courier).toEqual(courier);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourier>>();
      const courier = { id: 123 };
      jest.spyOn(courierFormService, 'getCourier').mockReturnValue(courier);
      jest.spyOn(courierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courier }));
      saveSubject.complete();

      // THEN
      expect(courierFormService.getCourier).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courierService.update).toHaveBeenCalledWith(expect.objectContaining(courier));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourier>>();
      const courier = { id: 123 };
      jest.spyOn(courierFormService, 'getCourier').mockReturnValue({ id: null });
      jest.spyOn(courierService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courier: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courier }));
      saveSubject.complete();

      // THEN
      expect(courierFormService.getCourier).toHaveBeenCalled();
      expect(courierService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourier>>();
      const courier = { id: 123 };
      jest.spyOn(courierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courierService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRestaurant', () => {
      it('Should forward to restaurantService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(restaurantService, 'compareRestaurant');
        comp.compareRestaurant(entity, entity2);
        expect(restaurantService.compareRestaurant).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
