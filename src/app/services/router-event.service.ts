import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouterEventService {
    constructor(private router: Router) {
    }

    subscribeToRouterEvent(): Observable<any> {
        return this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    }
}