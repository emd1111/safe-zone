// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductManagementComponent } from './product-management.component';
import { Product } from '../../types';
import { ProductService } from '../../services/product/product.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductManagementComponent', () => {
  let component: ProductManagementComponent;
  let fixture: ComponentFixture<ProductManagementComponent>;
  let productService: any;
  const mockProduct: Product = { id: '1', name: 'Test', description: 'desc', price: 10, quantity: 1, userID: 'u1' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagementComponent],
      providers: [
        { provide: ProductService, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManagementComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('devrait initialiser les items du menu', () => {
    expect(component.items.length).toBeGreaterThan(0);
    expect(component.items[0].label).toBe('Options');
  });
}); 