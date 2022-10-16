import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../util/state.service";
import {Friend} from "../util/friend";
import {StepRoutingService} from "../util/step-routing.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

    total?: number;
    friends: Friend[] = [];
    subs: Subscription = new Subscription();

    constructor(
        private stateService: StateService,
        private stepRoutingService: StepRoutingService
    ) {
    }

    ngOnInit(): void {
        this.stateService.invalidateStep();
        this.subs.add(
            this.stepRoutingService.nextAction$
                .subscribe(() => this.stateService.state.friends?.push(...this.friends))
        );
        // this.friends.push(...[
        //     {id: 1, name: "Aaaa", spent: 0},
        //     {id: 2, name: "Bbbb", spent: 0},
        //     {id: 3, name: "Cccc", spent: 0},
        //     {id: 4, name: "Dddd", spent: 0},
        //     {id: 5, name: "Eeee", spent: 0},
        //     {id: 6, name: "Ffff", spent: 0}
        // ]);
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
        this.stateService.state.needsCalculation = true;
    }

    checkFriendsValid() {
        if (this.friends.length > 0 && this.friends.every(f => f.name.trim().length > 0)) {
            this.stateService.validateStep();
            return;
        }

        this.stateService.invalidateStep();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
