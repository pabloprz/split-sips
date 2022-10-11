import {Component, OnInit} from '@angular/core';
import {StateService, StepState} from "./util/state.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {NavigationEnd, Router} from "@angular/router";
import {filter, first} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    nextSelected = false;
    title = 'split-sips';
    stepsState?: StepState;

    constructor(
        public stateService: StateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.stateService.stepState$.subscribe(state => this.stepsState = state);
        this.stateService.initialize();
        this.stateService.invalidateStep();
        this.checkLandingRoute();
    }

    selectionChanged($event: StepperSelectionEvent) {
        if (!this.nextSelected) {
            this.stateService.moveTo($event.selectedIndex);
        }
        this.router.navigate(['/step' + this.stateService.steps.currentStep]);
    }

    next(stepper: MatStepper) {
        this.stateService.jumpStep();
        this.nextSelected = true;
        setTimeout(() => {
            stepper.next()
        }, 0)
    }

    checkLandingRoute() {
        // We pick the first navigation event to check we are not accessing further steps
        this.router.events.pipe(
            filter(ev => ev instanceof NavigationEnd),
            first()
        ).subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                if (ev.url != '/step1') {
                    this.router.navigate(['/step1']);
                }
            }
        });
    }
}
