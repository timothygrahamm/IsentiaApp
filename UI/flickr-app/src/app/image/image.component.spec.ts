import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("submitSearchTerm should return a defined image array", () => {
    component.submitSearchTerm("mountain");
    expect(component.url_array).toBeDefined;
  })

  it("submitSearchTerm should return an undefined image array", () => {
    component.submitSearchTerm("a very specific search term that would never return any flickr images");
    expect(component.url_array).toBeUndefined;
  })
});
