import { TestBed } from '@angular/core/testing';

import { RouterEventService } from './router-event.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

describe('RouterEventService', () => {
    let service: RouterEventService;
    let routerEventRelaySubject: ReplaySubject<RouterEvent>;
    let routerMock;

    beforeEach(() => {
        routerEventRelaySubject = new ReplaySubject<RouterEvent>(1);
        routerMock = {
            events: routerEventRelaySubject.asObservable()
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: routerMock }
            ]
        });
        service = TestBed.inject(RouterEventService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('subscribeToEventUrl should', () => {
        it('return route equals to mock url on firing NavigationEnd', () => {
            const result: Observable<any> = service.subscribeToRouterEvent();
            const url = '/car-search';
            result.subscribe((route: any) => {
                expect(route.url).toEqual(url);
            });
            routerEventRelaySubject.next(new NavigationEnd(1, url, 'redirectUrl'));
        });
    });
});