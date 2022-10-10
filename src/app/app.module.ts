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
} from './friends/circle-initials/circle-initials.component';

@NgModule({
    declarations: [
        AppComponent,
        FriendsComponent,
        TotalBillComponent,
        CircleInitialsComponent
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
        MatStepperModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
