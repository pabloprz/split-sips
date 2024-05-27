import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {StateService} from "../util/state.service";
import {Friend} from "../util/friend";
import {Subscription} from "rxjs";
import {colors} from "../util/colors";

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren('friendInput') friendInputs!: QueryList<ElementRef>;

    total?: number;
    friends: Friend[] = [];
    subs: Subscription = new Subscription();

    constructor(private stateService: StateService) {
    }

    ngOnInit(): void {
        this.stateService.invalidateStep();
        this.friends = this.stateService.state.friends;
        this.checkFriendsValid();
    }

    ngAfterViewInit() {
        this.subs.add(
            this.friendInputs.changes.pipe().subscribe(() => {
                if (this.friendInputs.length) {
                    this.friendInputs.last.nativeElement.focus();
                }
            })
        )
    }

    addFriend() {
        this.friends.push({
            id: this.friends.length, name: '', spent: 0,
            color: colors[colors.length - this.friends.length - 1]
        });
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
