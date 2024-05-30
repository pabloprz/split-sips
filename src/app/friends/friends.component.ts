import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {StateService} from "../util/state.service";
import {Friend, friendsLocalStorage} from "../util/friend";
import {Subscription} from "rxjs";
import {StepRoutingService} from "../util/step-routing.service";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

    @ViewChildren('friendInput') friendInputs!: QueryList<ElementRef>;

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
        this.friends = this.stateService.state.friends;
        this.checkFriendsValid();
        // Update local storage with the updated friends when we leave this step
        this.subs.add(this.stepRoutingService.nextAction$.subscribe(() => {
            this.updateFriendsStorage();
        }));
    }

    addFriend() {
        this.friends.push({
            id: Date.now(), name: '', spent: 0,
            color: this.stateService.getNewColor()
        });
        this.stateService.invalidateStep();
        setTimeout(() => this.friendInputs.last.nativeElement.focus(), 0);
    }

    removeFriend(friend: Friend) {
        const index = this.friends.findIndex(f => f.id === friend.id);

        if (index >= 0) {
            this.stateService.addColorBack(friend.color);
            this.friends.splice(index, 1);
            this.friendChanged();
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

    updateFriendsStorage() {
        // Updating the storage of friends, setting all of them to 0 spent for when they come back
        localStorage.setItem(friendsLocalStorage, JSON.stringify(this.friends.map(f => ({
            ...f,
            spent: 0
        }))));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
