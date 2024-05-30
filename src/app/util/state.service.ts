import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Friend, friendsLocalStorage} from "./friend";
import {Expense} from "./expense";
import {colorCodes} from "./colors";

export interface State {
    total?: number;
    friends: Friend[];
    expenses: Expense[];
    needsCalculation: boolean;
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

    state!: State;
    steps: StepState = {
        currentStep: 1,
        currentStepValid: false,
        step1Completed: false,
        step2Completed: false,
        step3Completed: false,
        step4Completed: false
    };

    private colors: string[] = [];

    constructor() {
    }

    initialize() {
        this.state = {friends: [], expenses: [], needsCalculation: true};
        this.stepState$.subscribe(steps => this.steps = steps);
        this.stepState.next({...this.steps});
        this.initializeColors();
        this.fetchFriendsFromStorage();
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

    previous() {
        const current = this.steps.currentStep - 1;
        this.stepState.next({
            currentStep: current,
            currentStepValid: true,
            step1Completed: current >= 1,
            step2Completed: current >= 2,
            step3Completed: current >= 3,
            step4Completed: current >= 4
        });

    }

    moveTo(step: number) {
        this.stepState.next({...this.steps, currentStep: step});
    }

    fetchFriendsFromStorage() {
        let storage = localStorage.getItem(friendsLocalStorage);
        if (storage == null) {
            return;
        }
        let fetchedFriends = JSON.parse(storage);
        if (fetchedFriends != null && fetchedFriends.length > 0) {
            this.state.friends = fetchedFriends;
        }

        // Syncing the colors to avoid repeated values
        this.state.friends.forEach(f => {
            const i = this.colors.indexOf(f.color);
            if (i >= 0) {
                this.colors.splice(i, 1);
            }
        });
    }

    private initializeColors() {
        for (const color of colorCodes) {
            this.colors.push(color);
        }
    }

    getNewColor(): string {
        return this.colors.pop() || 'Magenta';
    }

    addColorBack(color: string) {
        this.colors.push(color);
    }

}
