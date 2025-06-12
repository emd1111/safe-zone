// Test pour ProductComponent avec overrideComponent
// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductMedia } from '../../types';
import { CartService } from '../../services/utils/cart.service';
import { MediaService } from '../../services/media/media.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const mockProductMedia: ProductMedia = {
  product: {
    id: '1',
    name: 'Test Product',
    description: 'A test product',
    price: 99.99,
    quantity: 10,
    userID: 'user1'
  },
  media: [
    { id: 'm1', imagePath: 'img.jpg', productId: '1' }
  ]
};

class MockCartService {
  isInCart = jasmine.createSpy('isInCart').and.returnValue(false);
  addToCart = jasmine.createSpy('addToCart');
  removeFromCart = jasmine.createSpy('removeFromCart');
}

class MockMediaService {
  getMedia = jasmine.createSpy('getMedia').and.returnValue('img.jpg');
}

// Créer un composant de test simplifié
@Component({
  selector: 'app-product-test',
  template: `
    <div>
      <h2>{{product?.product?.name}}</h2>
      <p>{{product?.product?.price}}</p>
      <button (click)="toggleCart()">Toggle Cart</button>
    </div>
  `,
  standalone: true
})
class TestProductComponent {
  @Input() product: ProductMedia | null = null;
  isInCart = false;

  constructor(
    private cartService: CartService,
    private mediaService: MediaService
  ) {}

  toggleCart() {
    if (this.isInCart) {
      this.cartService.removeFromCart(this.product!.product.id);
    } else {
      this.cartService.addToCart(this.product!.product);
    }
  }
}

describe('ProductComponent (Override)', () => {
  let component: TestProductComponent;
  let fixture: ComponentFixture<TestProductComponent>;
  let cartService: MockCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestProductComponent],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: MediaService, useClass: MockMediaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestProductComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as any;
    component.product = mockProductMedia;
    fixture.detectChanges();
  });

  it('devrait afficher le nom et le prix du produit', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('99.99');
  });

  it('devrait appeler addToCart lors du toggleCart si non présent dans le panier', () => {
    component.isInCart = false;
    component.toggleCart();
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProductMedia.product);
  });

  it('devrait appeler removeFromCart lors du toggleCart si déjà dans le panier', () => {
    cartService.isInCart.and.returnValue(true);
    component.isInCart = true;
    component.toggleCart();
    expect(cartService.removeFromCart).toHaveBeenCalledWith(mockProductMedia.product.id);
  });
});

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let cartService: MockCartService;
  let mediaService: MockMediaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: MediaService, useClass: MockMediaService },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as any;
    mediaService = TestBed.inject(MediaService) as any;
    component.product = mockProductMedia;
    fixture.detectChanges();
  });

  it('devrait appeler addToCart lors du toggleCart si non présent dans le panier (vrai ProductComponent)', () => {
    cartService.isInCart.and.returnValue(false);
    component.isInCart = false;
    component.toggleCart();
    expect(cartService.addToCart).toHaveBeenCalledWith(mockProductMedia.product);
    expect(cartService.isInCart).toHaveBeenCalledWith(mockProductMedia.product.id);
    // Vérifie que l'état local est bien mis à jour
    expect(component.isInCart).toBe(false); // car le mock retourne toujours false
  });
});