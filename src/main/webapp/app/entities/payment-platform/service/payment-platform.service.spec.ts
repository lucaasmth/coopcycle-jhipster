import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPaymentPlatform } from '../payment-platform.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../payment-platform.test-samples';

import { PaymentPlatformService } from './payment-platform.service';

const requireRestSample: IPaymentPlatform = {
  ...sampleWithRequiredData,
};

describe('PaymentPlatform Service', () => {
  let service: PaymentPlatformService;
  let httpMock: HttpTestingController;
  let expectedResult: IPaymentPlatform | IPaymentPlatform[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PaymentPlatformService);
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

    it('should create a PaymentPlatform', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const paymentPlatform = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(paymentPlatform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PaymentPlatform', () => {
      const paymentPlatform = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(paymentPlatform).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PaymentPlatform', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PaymentPlatform', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PaymentPlatform', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPaymentPlatformToCollectionIfMissing', () => {
      it('should add a PaymentPlatform to an empty array', () => {
        const paymentPlatform: IPaymentPlatform = sampleWithRequiredData;
        expectedResult = service.addPaymentPlatformToCollectionIfMissing([], paymentPlatform);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentPlatform);
      });

      it('should not add a PaymentPlatform to an array that contains it', () => {
        const paymentPlatform: IPaymentPlatform = sampleWithRequiredData;
        const paymentPlatformCollection: IPaymentPlatform[] = [
          {
            ...paymentPlatform,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPaymentPlatformToCollectionIfMissing(paymentPlatformCollection, paymentPlatform);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PaymentPlatform to an array that doesn't contain it", () => {
        const paymentPlatform: IPaymentPlatform = sampleWithRequiredData;
        const paymentPlatformCollection: IPaymentPlatform[] = [sampleWithPartialData];
        expectedResult = service.addPaymentPlatformToCollectionIfMissing(paymentPlatformCollection, paymentPlatform);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentPlatform);
      });

      it('should add only unique PaymentPlatform to an array', () => {
        const paymentPlatformArray: IPaymentPlatform[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const paymentPlatformCollection: IPaymentPlatform[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentPlatformToCollectionIfMissing(paymentPlatformCollection, ...paymentPlatformArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const paymentPlatform: IPaymentPlatform = sampleWithRequiredData;
        const paymentPlatform2: IPaymentPlatform = sampleWithPartialData;
        expectedResult = service.addPaymentPlatformToCollectionIfMissing([], paymentPlatform, paymentPlatform2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(paymentPlatform);
        expect(expectedResult).toContain(paymentPlatform2);
      });

      it('should accept null and undefined values', () => {
        const paymentPlatform: IPaymentPlatform = sampleWithRequiredData;
        expectedResult = service.addPaymentPlatformToCollectionIfMissing([], null, paymentPlatform, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(paymentPlatform);
      });

      it('should return initial array if no PaymentPlatform is added', () => {
        const paymentPlatformCollection: IPaymentPlatform[] = [sampleWithRequiredData];
        expectedResult = service.addPaymentPlatformToCollectionIfMissing(paymentPlatformCollection, undefined, null);
        expect(expectedResult).toEqual(paymentPlatformCollection);
      });
    });

    describe('comparePaymentPlatform', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePaymentPlatform(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePaymentPlatform(entity1, entity2);
        const compareResult2 = service.comparePaymentPlatform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePaymentPlatform(entity1, entity2);
        const compareResult2 = service.comparePaymentPlatform(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePaymentPlatform(entity1, entity2);
        const compareResult2 = service.comparePaymentPlatform(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
