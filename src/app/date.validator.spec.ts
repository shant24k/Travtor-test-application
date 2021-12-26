import { FormControl, FormGroup } from '@angular/forms';
import { ValidateDate, ValidatePickUpDropOffDate } from './date.validator';

describe('ValidateDate', () => {
    const control = new FormControl('input');

    it('should return null if input date is valid', () => {
        const validDateStr = new Date().getFullYear() + 2 + '-01-01'; 
        control.setValue(validDateStr);
        expect(ValidateDate(control)).toBeNull();
    });

    it('should return null if input date is valid', () => {
        const validDateStr = new Date().getFullYear() + 6 + '-01-01'; 
        control.setValue(validDateStr);
        expect(ValidateDate(control)).toEqual({ aheadOfFiveYearsInFuture: true });
    });

    it('should return null if input date is valid', () => {
        const validDateStr = new Date().getFullYear() - 2 + '-01-01'; 
        control.setValue(validDateStr);
        expect(ValidateDate(control)).toEqual({ pastDate: true });
    });

});

describe('ValidatePickUpDropOffDate', () => {
    const formGroup = new FormGroup({
        pickUpDate: new FormControl(''),
        dropOffDate: new FormControl(''),
        pickUpTime: new FormControl(''),
        dropOffTime: new FormControl('')
    });

    it('should return null if pick up & drop off dates are valid', () => {
        const validPickUpDateStr = new Date().getFullYear() + 2 + '-01-01';
        const validDropOffDateStr = new Date().getFullYear() + 2 + '-01-02';
        const pickUpTime = "05:00";
        const dropOffTime = "17:00";
        formGroup.setValue({
            pickUpDate: validPickUpDateStr,
            dropOffDate: validDropOffDateStr,
            pickUpTime: pickUpTime,
            dropOffTime: dropOffTime
        });
        expect(ValidatePickUpDropOffDate(formGroup)).toBeNull();
    });

    it('should return { invalidPickUpDropOffCombination: true } if pick up date is later than drop off 1', () => {
        const validPickUpDateStr = new Date().getFullYear() + 2 + '-01-02';
        const validDropOffDateStr = new Date().getFullYear() + 2 + '-01-01';
        const pickUpTime = "05:00";
        const dropOffTime = "17:00";
        formGroup.setValue({
            pickUpDate: validPickUpDateStr,
            dropOffDate: validDropOffDateStr,
            pickUpTime: pickUpTime,
            dropOffTime: dropOffTime
        });
        expect(ValidatePickUpDropOffDate(formGroup)).toEqual({ invalidPickUpDropOffCombination: true });
    });

    it('should return { invalidPickUpDropOffCombination: true } if pick up date is later than drop off 2', () => {
        const validPickUpDateStr = new Date().getFullYear() + 2 + '-01-01';
        const validDropOffDateStr = new Date().getFullYear() + 2 + '-01-01';
        const pickUpTime = "17:00";
        const dropOffTime = "05:00";
        formGroup.setValue({
            pickUpDate: validPickUpDateStr,
            dropOffDate: validDropOffDateStr,
            pickUpTime: pickUpTime,
            dropOffTime: dropOffTime
        });
        expect(ValidatePickUpDropOffDate(formGroup)).toEqual({ invalidPickUpDropOffCombination: true });
    });

    it('should return null if input dates are valid', () => {
        const validPickUpDateStr = new Date().getFullYear() + 2 + '-01-01';
        const validDropOffDateStr = new Date().getFullYear() + 2 + '-01-01';
        const pickUpTime = "05:00";
        const dropOffTime = "17:00";
        formGroup.setValue({
            pickUpDate: validPickUpDateStr,
            dropOffDate: validDropOffDateStr,
            pickUpTime: pickUpTime,
            dropOffTime: dropOffTime
        });
        expect(ValidatePickUpDropOffDate(formGroup)).toBeNull();
    });

});