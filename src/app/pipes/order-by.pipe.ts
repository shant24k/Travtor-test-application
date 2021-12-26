import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<any>, orderField?: any, orderType?: any): any {
    if (orderField) {
      array = array.slice().sort((a: any, b: any) => {
        let ae;
        let be
        if (orderField.indexOf('.') !== -1) {
          let fields = orderField.split('.');
          switch (fields.length) {
            case 2:
              ae = a[fields[0]][fields[1]];
              be = b[fields[0]][fields[1]];
              break;
            case 3:
              ae = a[fields[0]][fields[1]][fields[2]];
              be = b[fields[0]][fields[1]][fields[2]];
              break;
          }
        } else {
          ae = a[orderField];
          be = b[orderField];
        }
        if (ae == undefined && be == undefined) return 0;
        if (ae == undefined && be != undefined) return orderType ? 1 : -1;
        if (ae != undefined && be == undefined) return orderType ? -1 : 1;
        if (ae == be) return 0;
        return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
      });
    }
    return array;
  }

}