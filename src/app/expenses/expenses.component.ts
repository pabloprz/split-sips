import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";
import {Subscription} from "rxjs";
import {Expense} from "../util/expense";
import {StepRoutingService} from "../util/step-routing.service";

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

    subs: Subscription = new Subscription();

    subtotal: number = 0;
    expenses: Expense[] = [];

    constructor(
        public stateService: StateService,
        private stepRoutingService: StepRoutingService
    ) {
    }

    ngOnInit(): void {
        this.stateService.invalidateStep();
        this.subs.add(
            this.stepRoutingService.nextAction$
                .subscribe(() =>
                    this.stateService.state.expenses?.push(...this.expenses))
        );
    }

    newExpense() {
        this.expenses.push({
            id: this.expenses.length,
            concept: '',
            friends: this.stateService.state.friends?.map(f => ({
                ...f,
                selected: false
            })) || [],
            nSelected: 0
        });
    }

    removeExpense(expense: Expense) {
        const index = this.expenses.findIndex(e => e.id === expense.id);
        if (index >= 0) {
            this.expenses.splice(index, 1);
            this.checkExpensesValid();
        }
    }

    checkExpensesValid() {
        if (this.expenses.length > 0
            && this.subtotal <= (this.stateService.state.total || 0)
            && this.expenses.every(e => e.concept.trim().length > 0 && e.amount != null && e.amount > 0 && e.nSelected > 0)) {
            this.stateService.validateStep();
            return;
        }

        this.stateService.invalidateStep();
    }

    expenseChanged() {
        this.subtotal = this.expenses.reduce((acc, exp) => {
            return acc + (exp.amount || 0)
        }, 0)
        this.checkExpensesValid();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
