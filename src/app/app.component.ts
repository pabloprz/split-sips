import {Component, OnInit} from '@angular/core';
import {StateService} from "./util/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'split-sips';

  constructor(public stateService: StateService) {
  }

  ngOnInit(): void {
    this.stateService.state = {};
    this.stateService.invalidateStep();
  }

}
