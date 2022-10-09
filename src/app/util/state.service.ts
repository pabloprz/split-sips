import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

export interface State {
    total?: number;
}

export interface StepState {
    currentStep: number;
    currentStepValid: boolean;
    step1Completed: boolean;
    step2Completed: boolean;
    step3Completed: boolean;
    step4Completed: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class StateService {

    private stepState = new Subject<StepState>();

    stepState$: Observable<StepState> = this.stepState.asObservable();

    state: State;
    steps: StepState;

    constructor() {
        this.state = {};

        this.steps = {
            currentStep: 1,
            currentStepValid: false,
            step1Completed: false,
            step2Completed: false,
            step3Completed: false,
            step4Completed: false
        };
    }

    initialize() {
        this.stepState$.subscribe(steps => this.steps = steps);
    }

    validateStep() {
        this.stepState.next({...this.steps, currentStepValid: true});
    }

    invalidateStep() {
        this.stepState.next({...this.steps, currentStepValid: false});
    }

    jumpStep() {
        if (this.steps.currentStep < 4 && this.steps.currentStepValid) {
            const current = this.steps.currentStep;
            this.stepState.next({
                currentStep: this.steps.currentStep + 1,
                currentStepValid: false,
                step1Completed: current >= 1,
                step2Completed: current >= 2,
                step3Completed: current >= 3,
                step4Completed: current >= 4
            });
        }
    }

}
