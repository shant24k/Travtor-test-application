import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCarSearch, getCarItineraries } from '../store/store-selector';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  selectedCar: any;
  getCarItineraries: any;
  selectedLang: string = '';

  constructor(private store: Store, private translate: TranslateService) { 
    this.store.pipe(select(getCarSearch)).subscribe((getCarSearch) => {
      this.selectedCar = getCarSearch;
    });
    this.store.pipe(select(getCarItineraries)).subscribe((getCarItineraries) => {
      this.getCarItineraries = getCarItineraries;
    });
  }

  ngOnInit(): void {
    console.log(this.selectedCar);
    console.log(this.getCarItineraries);
    let lang = localStorage.getItem('lastSelectedLang');
    if (lang) {
      this.selectedLang = lang;
    } else {
      this.selectedLang = 'en';
    }
  }

  updateLang(lang: string) {
    this.selectedLang = lang;
    localStorage.setItem("lastSelectedLang", this.selectedLang);
    this.translate.use(this.selectedLang);
  }

}
