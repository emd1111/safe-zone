// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { AlertService } from '../../services/alert/alert.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productService: any;
  let alertService: any;
  let messageService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: { createProduct: jasmine.createSpy('createProduct').and.returnValue(of({message: 'ok'})) } },
        { provide: AlertService, useValue: { clear: jasmine.createSpy('clear'), error: jasmine.createSpy('error') } },
        { provide: MessageService, useValue: { add: jasmine.createSpy('add') } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    alertService = TestBed.inject(AlertService);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('devrait créer le formulaire avec les bons contrôles', () => {
    expect(component.addProductForm.contains('name')).toBeTrue();
    expect(component.addProductForm.contains('description')).toBeTrue();
    expect(component.addProductForm.contains('price')).toBeTrue();
    expect(component.addProductForm.contains('quantity')).toBeTrue();
  });

  it('ne doit pas soumettre si le formulaire est invalide', () => {
    component.addProductForm.setValue({ name: '', description: '', price: '', quantity: '' });
    component.onSubmit();
    expect(productService.createProduct).not.toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalled();
  });

  it('doit appeler productService.createProduct si le formulaire est valide', () => {
    component.addProductForm.setValue({ name: 'Test', description: 'Description valide', price: 10, quantity: 2 });
    component.onSubmit();
    expect(productService.createProduct).toHaveBeenCalled();
  });

  it('doit appeler alertService.error en cas d\'erreur API', () => {
    productService.createProduct.and.returnValue(throwError({ error: { message: 'Erreur', data: 'Détail' } }));
    component.addProductForm.setValue({ name: 'Test', description: 'Description valide', price: 10, quantity: 2 });
    component.onSubmit();
    expect(alertService.error).toHaveBeenCalled();
  });
}); 