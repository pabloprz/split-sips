import {Component, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";

@Component({
  selector: 'app-total-bill',
  templateUrl: './total-bill.component.html',
  styleUrls: ['./total-bill.component.css']
})
export class TotalBillComponent implements OnInit {

  total?: number;

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
  }

  onNext() {
    this.stateService.state.total = this.total;
  }

  totalChanged() {
    if (this.total != null) {
      this.stateService.stepCompleted();
    } else {
      this.stateService.invalidateStep();
    }
  }
}
