import {Injectable} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {StateService} from "./state.service";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StepRoutingService {

    private nextAction = new Subject<void>();

    nextAction$: Observable<void> = this.nextAction.asObservable();

    stepper!: MatStepper;

    constructor(private stateService: StateService) {
    }

    initialize(stepper: MatStepper) {
        this.stepper = stepper;
    }

    next() {
        this.stateService.jumpStep();
        this.nextAction.next();
        setTimeout(() => {
            this.stepper.next()
        }, 100);
    }

    previous() {
        this.stateService.previous();
    }
}
