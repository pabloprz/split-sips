import {Component, OnInit} from '@angular/core';
import {StateService, StepState} from "./util/state.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'split-sips';
    stepsState?: StepState;

    constructor(public stateService: StateService) {
    }

    ngOnInit(): void {
        this.stateService.initialize();
        this.stateService.state = {};
        this.stateService.invalidateStep();
        this.stateService.stepState$.subscribe(state => this.stepsState = state);
    }

    selectionChanged($event: StepperSelectionEvent) {
        console.log($event);
    }

    next(stepper: MatStepper) {
        this.stateService.jumpStep();
        setTimeout(() => {
            stepper.next()
        }, 0)
    }
}
