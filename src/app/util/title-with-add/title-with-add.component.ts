import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-title-with-add',
    templateUrl: './title-with-add.component.html',
    styleUrls: ['./title-with-add.component.css']
})
export class TitleWithAddComponent {

    @Input() title: string = "";
    @Output() addClicked = new EventEmitter<void>();

    constructor() {
    }

}
