import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadImagesComponent } from './upload-images.component';
import { MediaService } from '../../services/media/media.service';
import { of, throwError } from 'rxjs';
import { ACTION, ProductMedia } from '../../types';
import { FileUploadModule } from 'primeng/fileupload';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

const mockProductMedia: ProductMedia = {
  product: { id: '1', name: 'Test', description: 'desc', price: 10, quantity: 1, userID: 'u1' },
  media: []
};

function createFakeFile(name: string, type: string, size: number): File {
  // File constructor: new File(bits, name, options)
  const blob = new Blob(['a'.repeat(size)], { type });
  Object.defineProperty(blob, 'size', { value: size });
  return new File([blob], name, { type });
}

describe('UploadImagesComponent', () => {
  let component: UploadImagesComponent;
  let fixture: ComponentFixture<UploadImagesComponent>;
  let mediaService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UploadImagesComponent,
        FileUploadModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: MediaService,
          useValue: {
            createMedia: jasmine.createSpy('createMedia').and.returnValue(of({ message: 'ok' })),
            updateMedia: jasmine.createSpy('updateMedia').and.returnValue(of({ message: 'ok' })),
          },
        },
        { provide: ActivatedRoute, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadImagesComponent);
    component = fixture.componentInstance;
    mediaService = TestBed.inject(MediaService);
    component.productMedia = mockProductMedia;
    component.action = ACTION.CREATE;
    fixture.detectChanges();
  });

  function makeFileSelectEvent(files: File[]): any {
    return {
      files,
      originalEvent: new Event('change'),
      currentFiles: files
    };
  }

  it('devrait émettre une erreur si un fichier dépasse la taille maximale', () => {
    spyOn(component.event, 'emit');
    const file = createFakeFile('big.png', 'image/png', 3 * 1024 * 1024);
    component.onSelect(makeFileSelectEvent([file]));
    expect(component.event.emit).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'error' }));
    expect(component.uploadedFiles.length).toBe(0);
  });

  it('devrait émettre une erreur si un fichier a un type non supporté', () => {
    spyOn(component.event, 'emit');
    const file = createFakeFile('test.txt', 'text/plain', 1024);
    component.onSelect(makeFileSelectEvent([file]));
    expect(component.event.emit).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'error' }));
    expect(component.uploadedFiles.length).toBe(0);
  });

  it('devrait ajouter les fichiers valides et émettre un événement info', () => {
    spyOn(component.event, 'emit');
    const file = createFakeFile('test.png', 'image/png', 1024);
    component.onSelect(makeFileSelectEvent([file]));
    expect(component.uploadedFiles.length).toBe(1);
    expect(component.event.emit).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'info' }));
  });

  it('devrait appeler mediaService.createMedia lors d\'un upload valide', () => {
    spyOn(component.event, 'emit');
    const file = createFakeFile('test.png', 'image/png', 1024);
    component.uploadedFiles = [file];
    const formData = new FormData();
    formData.append('files', file);
    component.create(formData);
    expect(mediaService.createMedia).toHaveBeenCalledWith('1', jasmine.any(FormData));
  });

  it('devrait émettre une erreur si createMedia échoue', () => {
    mediaService.createMedia.and.returnValue(throwError({ error: { message: 'Erreur serveur' } }));
    spyOn(component.event, 'emit');
    const file = createFakeFile('test.png', 'image/png', 1024);
    component.uploadedFiles = [file];
    const formData = new FormData();
    formData.append('files', file);
    component.create(formData);
    expect(component.event.emit).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'error' }));
  });
});