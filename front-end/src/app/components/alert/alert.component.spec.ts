// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { AlertService } from '../../services/alert/alert.service';
import { Alert, AlertVariant } from '../../types';
import { of } from 'rxjs';
import { Component } from '@angular/core';

// Mock AlertService
class MockAlertService {
  alert$ = of({
    variant: AlertVariant.Success,
    title: 'Succès',
    message: 'Opération réussie !'
  } as Alert);
  clear = jasmine.createSpy('clear');
}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: MockAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [
        { provide: AlertService, useClass: MockAlertService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService) as any;
    fixture.detectChanges();
  });

  it('devrait afficher une alerte de succès', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Succès');
    expect(compiled.textContent).toContain('Opération réussie');
  });

  it('devrait appeler alertService.clear quand clearAlert est appelé', () => {
    component.clearAlert();
    expect(alertService.clear).toHaveBeenCalled();
  });
});
