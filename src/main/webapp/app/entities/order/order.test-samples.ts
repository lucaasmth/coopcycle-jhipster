import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 47761,
  number: 34511,
  orderDate: dayjs('2023-03-19T02:37'),
};

export const sampleWithPartialData: IOrder = {
  id: 34054,
  number: 47091,
  orderDate: dayjs('2023-03-19T06:02'),
  deliveryDate: dayjs('2023-03-18T23:14'),
  status: 'Franc',
};

export const sampleWithFullData: IOrder = {
  id: 3810,
  number: 82425,
  orderDate: dayjs('2023-03-19T08:52'),
  deliveryDate: dayjs('2023-03-18T20:37'),
  status: 'Account Cambridgeshire',
};

export const sampleWithNewData: NewOrder = {
  number: 80079,
  orderDate: dayjs('2023-03-19T16:33'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
