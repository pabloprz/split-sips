import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";
import {StepRoutingService} from "../util/step-routing.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-total-bill',
    templateUrl: './total-bill.component.html',
    styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent implements OnInit, OnDestroy {

    total?: number;
    subs: Subscription = new Subscription();

    constructor(
        private stateService: StateService,
        private stepRoutingService: StepRoutingService
    ) {
    }

    ngOnInit(): void {
        this.subs.add(this.stepRoutingService.nextAction$.subscribe(() => this.updateState()));
        this.total = this.stateService.state.total;
        this.checkTotalValid();
    }

    onNext() {
        this.stepRoutingService.next();
    }

    totalChanged() {
        this.checkTotalValid();
        this.stateService.state.needsCalculation = true;
    }

    checkTotalValid() {
        if (this.total != null) {
            this.stateService.validateStep();
        } else {
            this.stateService.invalidateStep();
        }
    }

    enterPressed() {
        if (this.total != null) {
            this.onNext();
        }
    }

    updateState() {
        this.stateService.state.total = this.total;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
