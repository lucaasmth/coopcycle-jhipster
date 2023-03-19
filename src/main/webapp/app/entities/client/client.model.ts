import { IRestaurant } from 'app/entities/restaurant/restaurant.model';

export interface IClient {
  id: number;
  lastName?: string | null;
  firstName?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  restaurant?: Pick<IRestaurant, 'id' | 'name'> | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
