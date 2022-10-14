import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FriendsComponent} from './friends/friends.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TotalBillComponent} from './total-bill/total-bill.component';
import {MatStepperModule} from "@angular/material/stepper";
import {
    CircleInitialsComponent
} from './util/circle-initials/circle-initials.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {
    TitleWithAddComponent
} from './util/title-with-add/title-with-add.component';
import {ExpensesComponent} from './expenses/expenses.component';
import {
    FriendSelectorComponent
} from './util/friend-selector/friend-selector.component';
import {ResultsComponent} from './results/results.component';

@NgModule({
    declarations: [
        AppComponent,
        FriendsComponent,
        TotalBillComponent,
        CircleInitialsComponent,
        TitleWithAddComponent,
        ExpensesComponent,
        FriendSelectorComponent,
        ResultsComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        NgbModule,
        MatStepperModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
