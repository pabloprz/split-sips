import {Component, OnInit} from '@angular/core';
import {State, StateService} from "../util/state.service";
import {Subscription} from "rxjs";
import {Friend} from "../util/friend";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    state!: State;
    friends: { [id: number]: Friend } = {};
    subs: Subscription = new Subscription();

    constructor(
        private stateService: StateService
    ) {
    }

    ngOnInit(): void {
        this.state = this.stateService.state;
        this.state.friends?.forEach(f => this.friends[f.id] = f);
        if (this.state.needsCalculation) {
            this.performCalculations();
            this.state.needsCalculation = false;
        }
    }

    performCalculations() {
        const sum = this.state.expenses.reduce((acc, exp) => {
            return acc + (exp.amount || 0)
        }, 0);
        const over = (this.state.total || 0) - sum;
        const overPct = over / sum;

        this.state.expenses.forEach(exp => {
            const eachPerson = (exp.amount || 0) / exp.nSelected;
            exp.friends.filter(f => f.selected).forEach(f =>
                this.friends[f.id].spent += eachPerson
            );
        });

        for (let key in this.friends) {
            this.friends[key].spent *= 1 + overPct;
        }
    }

}
