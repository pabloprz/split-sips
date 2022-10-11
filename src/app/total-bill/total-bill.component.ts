import {Component, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";
import {StepRoutingService} from "../util/step-routing.service";

@Component({
    selector: 'app-total-bill',
    templateUrl: './total-bill.component.html',
    styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent implements OnInit {

    total?: number;

    constructor(
        private stateService: StateService,
        private stepRoutingService: StepRoutingService
    ) {
    }

    ngOnInit(): void {
        this.stepRoutingService.nextAction$.subscribe(() => this.updateState());
    }

    onNext() {
        this.stepRoutingService.next();
    }

    totalChanged() {
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
}
