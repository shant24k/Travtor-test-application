import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarsService } from './cars.service';

describe('CarsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CarsService]
        });
    });

    it('should be initialized', inject([CarsService], (carsService: CarsService) => {
        expect(carsService).toBeTruthy();
    }));

    it('should perform search correctly', fakeAsync(
        inject([CarsService, HttpTestingController], (carsService: CarsService, backend: HttpTestingController) => {

            const responseObject = {
                currency: 'USD',
                CarItineraries: []
            };
            let response = null;

            carsService.search().subscribe(
                (receivedResponse: any) => {
                    response = receivedResponse;
                },
                (error: any) => { }
            );

            const requestWrapper = backend.expectOne({ url: '/assets/carMockItineraries.json' });
            requestWrapper.flush(responseObject);

            tick();

            expect(requestWrapper.request.method).toEqual('GET');
        })
    ));

});