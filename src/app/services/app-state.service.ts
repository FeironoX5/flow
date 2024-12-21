import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public isNewTaskPopupOpen = signal<boolean>(false);
}
