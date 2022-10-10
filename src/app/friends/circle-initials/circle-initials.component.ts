import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-circle-initials',
    templateUrl: './circle-initials.component.html',
    styleUrls: ['./circle-initials.component.css']
})
export class CircleInitialsComponent implements OnChanges {

    @Input() name?: string;
    initials = "";

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.name = this.name?.trim();
        if (this.name != null && this.name.length > 0) {
            const names = this.name.split(" ");
            if (names.length >= 2) {
                this.initials = names[0].substring(0, 1) + names[1].substring(0, 1);
            } else {
                this.initials = names[0].substring(0, names[0].length > 1 ? 2 : 1);
            }
        } else {
            this.initials = "";
        }
    }

}
