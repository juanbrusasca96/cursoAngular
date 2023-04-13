import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnChanges {

  @Input() size: number = 50

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.establecerTamaño()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.establecerTamaño()
  }

  establecerTamaño(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', `${this.size}px`)
  }
}
