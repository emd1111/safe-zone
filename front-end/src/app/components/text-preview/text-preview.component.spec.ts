// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextPreviewComponent } from './text-preview.component';

describe('TextPreviewComponent', () => {
  let component: TextPreviewComponent;
  let fixture: ComponentFixture<TextPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextPreviewComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TextPreviewComponent);
    component = fixture.componentInstance;
  });

  it('devrait afficher le texte tronqué si la limite est dépassée', () => {
    component.text = 'Ceci est un texte très long pour le test.';
    component.limit = 10;
    component.isExpended = false;
    fixture.detectChanges();
    expect(component.displayText).toBe('Ceci est u...');
  });

  it('devrait afficher le texte complet si showFullText est true', () => {
    component.text = 'Ceci est un texte très long pour le test.';
    component.limit = 10;
    component.isExpended = true;
    component.showFullText = true;
    fixture.detectChanges();
    expect(component.displayText).toBe('Ceci est un texte très long pour le test.');
  });

  it('devrait afficher le bouton toggle si isExpended est true et texte long', () => {
    component.text = 'Ceci est un texte très long pour le test.';
    component.limit = 10;
    component.isExpended = true;
    fixture.detectChanges();
    expect(component.shouldShowToggleButton).toBeTrue();
  });
}); 