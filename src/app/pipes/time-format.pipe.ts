import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description This pipe transforms valid 24 hours time format into 12 hours format.  
 */

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value.indexOf(':') !== -1 && value.indexOf('AM') === -1 && value.indexOf('PM') === -1) {
      const hourEnd = value.split(':')[0];
      const minuteEnd = value.split(':')[1];
      const hours24hrsNum = Number(hourEnd);
      const hours12hrsNum = hours24hrsNum % 12 || 12;
      const ampm = (hours24hrsNum < 12 || hours24hrsNum === 24) ? "AM" : "PM";
      const time12hrsString = hours12hrsNum + ':' + minuteEnd + ' ' + ampm;
      return time12hrsString;
    }
    return value;
  }
}
