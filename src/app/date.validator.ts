import { AbstractControl } from '@angular/forms';

/**
 * 
 * @param control
 * @returns  pastDate: true if entered date is past date. And { aheadOfFiveYearsInFuture: true } if entered date is past date or Future date more than 5 years from current date i.e. 1825 days.
 */
export function ValidateDate(control: AbstractControl) {
  if (control.value) {
    const date1 = new Date(control.value).getTime();
    const date2 = new Date().getTime();
    
    const date = new Date().toISOString();
    const dateString = date.split('T')[0];
    if (date1 < date2 && (control.value !== dateString)) {
        return { pastDate: true };
    }
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1825) {
        return { aheadOfFiveYearsInFuture: true };
    }
    return null;
  }
  return null;
}

/**
 * 
 * @param fGroup
 * @returns  invalidPickUpDropOffCombination: true  when pick up date is later than drop off date.
 */
export function ValidatePickUpDropOffDate(fGroup: AbstractControl) {
    if (new Date(fGroup.get('pickUpDate')?.value).getTime() >  new Date(fGroup.get('dropOffDate')?.value).getTime()) {
        return { invalidPickUpDropOffCombination: true };
    }
    if (fGroup.get('pickUpDate')?.value ===  fGroup.get('dropOffDate')?.value && fGroup.get('pickUpTime')?.value && fGroup.get('dropOffTime')?.value) {
        let timzoneOffset = new Date().getTimezoneOffset() / 60;
        let easternHemisphere;
        let hours = '';
        let minutes;
        if (timzoneOffset < 0) {
            timzoneOffset = timzoneOffset * -1;
            easternHemisphere = true;
        }
        if (Math.floor(timzoneOffset) !== timzoneOffset) {
            const decimalPart = Number(timzoneOffset.toString().split('.')[1]);
            minutes = (decimalPart * 6).toString();
        }
        if (timzoneOffset.toString().indexOf('.') === -1) {
            hours = timzoneOffset.toString();
        }
        if (timzoneOffset.toString().indexOf('.') !== -1) {
           hours = timzoneOffset.toString().split('.')[0];
        }
        if (hours.length === 1) {
            hours = '0' + hours;
        }
        const pickUpDateString = fGroup.get('pickUpDate')?.value + 'T' + fGroup.get('pickUpTime')?.value + ':00.000' + (easternHemisphere ? '+' : '-') + hours + ':' + minutes;
        const dropOffDateString = fGroup.get('dropOffDate')?.value + 'T' + fGroup.get('dropOffTime')?.value + ':00.000' + (easternHemisphere ? '+' : '-') + hours + ':' + minutes;
        console.log('pickUpDateString: ', pickUpDateString);
        console.log('dropOffDateString: ', dropOffDateString);
        if (new Date(pickUpDateString).getTime() > new Date(dropOffDateString).getTime()) {
            return { invalidPickUpDropOffCombination: true };
        }
        return null;
    }
    return null;
  }