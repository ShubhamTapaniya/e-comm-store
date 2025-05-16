import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = signal<string | null>(null);

  show(msg: string) {
    this.message.set(msg);

    setTimeout(() => {
      this.message.set(null);
    }, 3000); // hide after 3 seconds
  }
}
