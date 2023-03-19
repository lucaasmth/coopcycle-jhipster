import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { VehicleType } from 'app/entities/enumerations/vehicle-type.model';

export interface ICourier {
  id: number;
  lastName?: string | null;
  firstName?: string | null;
  email?: string | null;
  phone?: string | null;
  vehicle?: VehicleType | null;
  status?: string | null;
  restaurant?: Pick<IRestaurant, 'id' | 'name'> | null;
}

export type NewCourier = Omit<ICourier, 'id'> & { id: null };
