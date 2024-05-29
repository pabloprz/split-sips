import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {StateService} from "../util/state.service";
import {Subscription} from "rxjs";
import {Expense} from "../util/expense";

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

    @ViewChildren('amountInput') amounts!: QueryList<ElementRef>;

    subs: Subscription = new Subscription();

    subtotal: number = 0;
    expenses: Expense[] = [];

    constructor(public stateService: StateService) {
    }

    ngOnInit(): void {
        this.stateService.invalidateStep();
        this.expenses = this.stateService.state.expenses;

        // TODO improve this and check for deleted ones
        this.stateService.state.friends.forEach(f => {
            this.expenses.forEach(e => {
                if (!e.friends.some(fr => fr.id === f.id)) {
                    e.friends.push({...f, selected: false});
                }
            });
        });
        this.checkExpensesValid();
        this.calculateSubtotal()
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

        setTimeout(() => this.amounts.last.nativeElement.focus(), 0);
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
            && this.expenses.every(e => e.amount != null && e.amount > 0 && e.nSelected > 0)) {
            this.stateService.validateStep();
            return;
        }

        this.stateService.invalidateStep();
    }

    expenseChanged() {
        this.calculateSubtotal()
        this.checkExpensesValid();
        this.stateService.state.needsCalculation = true;
    }

    calculateSubtotal() {
        this.subtotal = this.expenses.reduce((acc, exp) => {
            return acc + (exp.amount || 0)
        }, 0)
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
