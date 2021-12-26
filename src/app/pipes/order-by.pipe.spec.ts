import { OrderByPipe } from './order-by.pipe';
import { car_list } from '../car-itineraries';

describe('Pipe: OrderBy', () => {
    let pipe: OrderByPipe;

    beforeEach(() => {
        pipe = new OrderByPipe();
    });

    it('providing no value returns fallback', () => {
        expect(pipe.transform(car_list.CarItineraries, '', false)).toBe(car_list.CarItineraries);
    });

    it('providing a price descending order request, should return sorted by price desc', () => {
        let priceDescending = pipe.transform(car_list.CarItineraries, 'fare.perDay', true);
        expect(JSON.stringify(priceDescending[0])).toBe(JSON.stringify(car_list.CarItineraries[3]));
    });

    it('providing a price ascending order request, should return sorted by price asc', () => {
        let priceAscending = pipe.transform(car_list.CarItineraries, 'fare.perDay', false);
        expect(JSON.stringify(priceAscending[0])).toBe(JSON.stringify(car_list.CarItineraries[0]));
    });

    it('providing a car company name descending order request, should return sorted by price desc', () => {
        let companyDescending = pipe.transform(car_list.CarItineraries, 'vehicle.name', true);
        expect(JSON.stringify(companyDescending[0])).toBe(JSON.stringify(car_list.CarItineraries[4]));
    });

    it('providing a car company name ascending order request, should return sorted by price asc', () => {
        let companyAscending = pipe.transform(car_list.CarItineraries, 'vehicle.name', false);
        expect(JSON.stringify(companyAscending[0])).toBe(JSON.stringify(car_list.CarItineraries[0]));
    });

    it('providing a car type descending order request, should return sorted by price desc', () => {
        let typeDescending = pipe.transform(car_list.CarItineraries, 'vehicle.type', true);
        expect(JSON.stringify(typeDescending[0])).toBe(JSON.stringify(car_list.CarItineraries[3]));
    });

    it('providing a car type ascending order request, should return sorted by price asc', () => {
        let typeAscending = pipe.transform(car_list.CarItineraries, 'vehicle.type', false);
        expect(JSON.stringify(typeAscending[0])).toBe(JSON.stringify(car_list.CarItineraries[4]));
    });

    it('providing a car baggage capacity asc order request, should return sorted by baggage capacity asc', () => {
        let bagAsc = pipe.transform(car_list.CarItineraries, 'vehicle.specifications.baggageCapacity', false);
        expect(JSON.stringify(bagAsc[0])).toBe(JSON.stringify(car_list.CarItineraries[0]));
    });

    it('providing a id dsc order request, should return sorted by id dsc', () => {
        let idDsc = pipe.transform(car_list.CarItineraries, 'id', true);
        expect(JSON.stringify(idDsc[0])).toBe(JSON.stringify(car_list.CarItineraries[4]));
    });

    it('providing a id order request, should return sorted by id', () => {
        let idDsc = pipe.transform(car_list.CarItineraries, 'a', false);
        expect(JSON.stringify(idDsc[0])).toBe(JSON.stringify(car_list.CarItineraries[0]));
    });

    it('providing a id order request, should return sorted by id', () => {
        let carItineraries = JSON.parse(JSON.stringify(car_list.CarItineraries));
        carItineraries[3]['fare']['perDay'] = undefined;
        let fareDesc = pipe.transform(carItineraries, 'fare.perDay', true);
        expect(JSON.stringify(fareDesc[0])).toBe(JSON.stringify(car_list.CarItineraries[4]));
    });

    it('providing a fare order request, should return sorted by fare', () => {
        let carItineraries = JSON.parse(JSON.stringify(car_list.CarItineraries));
        carItineraries[0]['fare']['perDay'] = undefined;
        let fareAsc = pipe.transform(carItineraries, 'fare.perDay', false);
        expect(JSON.stringify(fareAsc[0].id)).toBe(JSON.stringify(car_list.CarItineraries[0].id));
    });
});