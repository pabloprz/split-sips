import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectedFriend} from "../friend";

@Component({
    selector: 'app-friend-selector',
    templateUrl: './friend-selector.component.html',
    styleUrls: ['./friend-selector.component.css']
})
export class FriendSelectorComponent implements OnInit {

    @Input() friends?: SelectedFriend[];
    @Output() selectionChanged: EventEmitter<number> = new EventEmitter<number>();

    nSelected = 0;

    constructor() {
    }

    ngOnInit(): void {
        this.nSelected = this.computeSelected();
    }

    friendClicked() {
        this.nSelected = this.computeSelected();
        this.selectionChanged.emit(this.nSelected);
    }

    computeSelected(): number {
        return this.friends?.reduce((acc, f) => {
            return f.selected ? acc + 1 : acc
        }, 0) || 0;
    }
}
