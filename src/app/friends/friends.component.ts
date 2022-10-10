import {Component, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";

export interface Friend {
    id: number;
    name: string;
    spent: number;
}

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    total?: number;
    friends: Friend[] = [];

    constructor(
        private stateService: StateService
    ) {
    }

    ngOnInit(): void {
        this.stateService.invalidateStep();
    }

    addFriend() {
        this.friends.push({id: this.friends.length, name: '', spent: 0});
        this.stateService.invalidateStep();
    }

    removeFriend(friend: Friend) {
        const index = this.friends.findIndex(f => f.id === friend.id);

        if (index >= 0) {
            this.friends.splice(index, 1);
            this.checkFriendsValid();
        }
    }

    friendChanged() {
        this.checkFriendsValid();
    }

    checkFriendsValid() {
        if (this.friends.length > 0 && this.friends.every(f => f.name.trim().length > 0)) {
            this.stateService.validateStep();
            return;
        }

        this.stateService.invalidateStep();
    }
}
