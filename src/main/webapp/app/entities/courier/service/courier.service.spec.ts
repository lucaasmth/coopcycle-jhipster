import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICourier } from '../courier.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../courier.test-samples';

import { CourierService } from './courier.service';

const requireRestSample: ICourier = {
  ...sampleWithRequiredData,
};

describe('Courier Service', () => {
  let service: CourierService;
  let httpMock: HttpTestingController;
  let expectedResult: ICourier | ICourier[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CourierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Courier', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const courier = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(courier).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Courier', () => {
      const courier = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(courier).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Courier', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Courier', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Courier', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCourierToCollectionIfMissing', () => {
      it('should add a Courier to an empty array', () => {
        const courier: ICourier = sampleWithRequiredData;
        expectedResult = service.addCourierToCollectionIfMissing([], courier);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courier);
      });

      it('should not add a Courier to an array that contains it', () => {
        const courier: ICourier = sampleWithRequiredData;
        const courierCollection: ICourier[] = [
          {
            ...courier,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCourierToCollectionIfMissing(courierCollection, courier);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Courier to an array that doesn't contain it", () => {
        const courier: ICourier = sampleWithRequiredData;
        const courierCollection: ICourier[] = [sampleWithPartialData];
        expectedResult = service.addCourierToCollectionIfMissing(courierCollection, courier);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courier);
      });

      it('should add only unique Courier to an array', () => {
        const courierArray: ICourier[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const courierCollection: ICourier[] = [sampleWithRequiredData];
        expectedResult = service.addCourierToCollectionIfMissing(courierCollection, ...courierArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const courier: ICourier = sampleWithRequiredData;
        const courier2: ICourier = sampleWithPartialData;
        expectedResult = service.addCourierToCollectionIfMissing([], courier, courier2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courier);
        expect(expectedResult).toContain(courier2);
      });

      it('should accept null and undefined values', () => {
        const courier: ICourier = sampleWithRequiredData;
        expectedResult = service.addCourierToCollectionIfMissing([], null, courier, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courier);
      });

      it('should return initial array if no Courier is added', () => {
        const courierCollection: ICourier[] = [sampleWithRequiredData];
        expectedResult = service.addCourierToCollectionIfMissing(courierCollection, undefined, null);
        expect(expectedResult).toEqual(courierCollection);
      });
    });

    describe('compareCourier', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCourier(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCourier(entity1, entity2);
        const compareResult2 = service.compareCourier(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCourier(entity1, entity2);
        const compareResult2 = service.compareCourier(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCourier(entity1, entity2);
        const compareResult2 = service.compareCourier(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
