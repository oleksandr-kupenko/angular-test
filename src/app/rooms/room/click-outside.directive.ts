import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOtsideDeirective {
  constructor(private _elementRef: ElementRef) {}

  @Output() clickOutside: EventEmitter<void> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement: HTMLElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      console.log('GOOD!!!');
      this.clickOutside.emit();
    }
  }
}
