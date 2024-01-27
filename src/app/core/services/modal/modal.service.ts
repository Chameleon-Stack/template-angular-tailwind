import { Injectable, Injector, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private viewContainerRef!: ViewContainerRef;
  private readonly injector: Injector;

  constructor(injector: Injector) {
    this.injector = injector;
  }

  public setViewContainerRef(ref: ViewContainerRef): void {
    this.viewContainerRef = ref;
  }

  public open<T extends object>(component: Type<T>, props?: { [key: string]: any }): void {
    if (!this.viewContainerRef) {
      console.error('viewContainerRef não foi definido');
      return;
    }

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(component, {
      injector: this.injector,
    });

    if (props) {
      Object.assign(componentRef.instance, props);
    }
  }

  public close(): void {
    if (!this.viewContainerRef) {
      return;
    }
    this.viewContainerRef.clear();
  }
}