import dayjs from 'dayjs/esm';
import { IClient } from 'app/entities/client/client.model';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ICourier } from 'app/entities/courier/courier.model';

export interface IOrder {
  id: number;
  number?: number | null;
  orderDate?: dayjs.Dayjs | null;
  deliveryDate?: dayjs.Dayjs | null;
  status?: string | null;
  client?: Pick<IClient, 'id'> | null;
  restaurant?: Pick<IRestaurant, 'id' | 'name'> | null;
  courier?: Pick<ICourier, 'id'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
