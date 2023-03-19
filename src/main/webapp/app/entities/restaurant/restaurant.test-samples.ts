import { IRestaurant, NewRestaurant } from './restaurant.model';

export const sampleWithRequiredData: IRestaurant = {
  id: 59197,
  name: 'zero Human',
  address: 'Future-proofed Rustic Director',
};

export const sampleWithPartialData: IRestaurant = {
  id: 64585,
  name: 'Towels Enhanced Kentucky',
  address: 'Locks Toys',
};

export const sampleWithFullData: IRestaurant = {
  id: 99702,
  name: 'Computers',
  address: 'Checking sticky',
};

export const sampleWithNewData: NewRestaurant = {
  name: 'streamline',
  address: 'Road',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
