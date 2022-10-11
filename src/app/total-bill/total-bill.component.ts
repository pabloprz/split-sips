import {Component, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-total-bill',
    templateUrl: './total-bill.component.html',
    styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent implements OnInit {

    total?: number;

    constructor(
        private stateService: StateService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    onNext() {
        this.stateService.state.total = this.total;
        this.router.navigate(['/step2']).then(() => {
            console.log('Navigation successful')
        });
    }

    totalChanged() {
        if (this.total != null) {
            this.stateService.validateStep();
        } else {
            this.stateService.invalidateStep();
        }
    }

    hey() {
        if (this.total != null) {
            this.onNext();
        }
    }
}
