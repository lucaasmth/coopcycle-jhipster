import { VehicleType } from 'app/entities/enumerations/vehicle-type.model';

import { ICourier, NewCourier } from './courier.model';

export const sampleWithRequiredData: ICourier = {
  id: 9567,
  lastName: 'Schaden',
  firstName: 'Tony',
  email: ':LUU]@kO{l|.!iH,t',
  phone: '+796491',
};

export const sampleWithPartialData: ICourier = {
  id: 21124,
  lastName: 'Nicolas',
  firstName: 'Michale',
  email: '"Th/p@zu,L7.9',
  phone: '+734',
  status: 'expedite quantify',
};

export const sampleWithFullData: ICourier = {
  id: 88700,
  lastName: 'Yundt',
  firstName: 'Jeramy',
  email: '2fz@TSP!.u"Omi4',
  phone: '+9519',
  vehicle: VehicleType['BIKE'],
  status: 'group',
};

export const sampleWithNewData: NewCourier = {
  lastName: 'Larkin',
  firstName: 'Emiliano',
  email: 'M@h/[%.Lh',
  phone: '+58763707224150',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
