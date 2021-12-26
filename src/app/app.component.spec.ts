import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  let translateService: TranslateService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [TranslateService]
    }).compileComponents();
    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Travtor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Travtor');
  });

  it('should call Translate service method in constructor', () => {
    spyOn(translateService, 'setDefaultLang');
    TestBed.createComponent(AppComponent);
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should call Translate service method in constructor', () => {
    localStorage.setItem('lastSelectedLang', 'es');
    spyOn(translateService, 'setDefaultLang');
    TestBed.createComponent(AppComponent);
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('es');
    localStorage.removeItem('lastSelectedLang');
  });

});
