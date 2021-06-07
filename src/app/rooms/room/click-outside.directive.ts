import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOtsideDeirective {
  constructor(private elementRef: ElementRef) {}


  @Output('clickOutside') clickOutside = new EventEmitter<void>();


  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      console.log('GOOD!!!');
      this.clickOutside.emit();
    }
  }
}
