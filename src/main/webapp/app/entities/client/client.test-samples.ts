import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 71655,
  lastName: 'Hartmann',
  firstName: 'Rosemary',
  email: "J@m'MUur.6",
  phone: '+72056899241242',
  address: 'Park',
};

export const sampleWithPartialData: IClient = {
  id: 89820,
  lastName: 'Roob',
  firstName: 'Milan',
  email: "!5@i;'U%.HjG3|",
  phone: '+843604107709',
  address: 'Shirt Soft',
};

export const sampleWithFullData: IClient = {
  id: 74977,
  lastName: 'Hane',
  firstName: 'Donnie',
  email: '7s@x&.Td$swP',
  phone: '+732741785252968',
  address: 'Frozen',
};

export const sampleWithNewData: NewClient = {
  lastName: 'Schulist',
  firstName: 'Tito',
  email: 'd.@+./P',
  phone: '+621461902',
  address: 'payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
