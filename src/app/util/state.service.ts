import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

export interface State {
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private completedStep = new Subject<boolean>();
  completedStep$: Observable<boolean> = this.completedStep.asObservable();

  state: State;

  constructor() {
    this.state = {};
  }

  stepCompleted() {
    this.completedStep.next(true);
  }

  invalidateStep() {
    this.completedStep.next(false);
  }

}
