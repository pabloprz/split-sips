import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StateService, StepState} from "./util/state.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatStepper} from "@angular/material/stepper";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter, first} from "rxjs";
import {StepRoutingService} from "./util/step-routing.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild('stepper') stepper!: MatStepper;

    nextSelected = false;
    title = 'split-sips';
    stepsState?: StepState;

    constructor(
        private stepRoutingService: StepRoutingService,
        public stateService: StateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.stateService.stepState$.subscribe(state => this.stepsState = state);
        this.stateService.initialize();
        this.stateService.invalidateStep();
        this.checkLandingRoute();
        this.router.events
            .subscribe(ev => {

                if (ev instanceof NavigationStart) {
                    if (ev.navigationTrigger === 'popstate') {
                        // Check which direction we are navigating, back or forward
                        if (ev.url != null && this.extractNums(ev.url) < this.stateService.steps.currentStep) {
                            this.stateService.previous();
                            this.stepper.previous();
                        } else {
                            // TODO :(
                            console.log('forward');
                        }
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        this.stepRoutingService.initialize(this.stepper);
    }

    selectionChanged($event: StepperSelectionEvent) {
        if (!this.nextSelected) {
            this.stateService.moveTo($event.selectedIndex + 1);
        }
        this.nextSelected = false;

        console.log(this.stateService.state)
        this.router.navigate(['/step' + this.stateService.steps.currentStep]);
    }

    next() {
        this.nextSelected = true;
        this.stepRoutingService.next();
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

    extractNums(url: string): number {
        return +url.replace(/^\D+/g, '');
    }
}
