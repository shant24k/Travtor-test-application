export interface PropertyMap {
    price: string,
    company: string,
    type: string
  }
  export interface OrderMap {
    asc: boolean,
    dsc: boolean,
  }
  export const propertyMap: PropertyMap = {
    'price': 'fare.perDay',
    'company': 'vehicle.name',
    'type': 'vehicle.type'
  }
  export const orderMap: OrderMap =  {
    'asc': false,
    'dsc': true
  }
  
  export const getKeyValue = function<T extends object, U extends keyof T> (obj: T, key: U) { return obj[key] }