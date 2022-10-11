import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TotalBillComponent} from "./total-bill/total-bill.component";
import {FriendsComponent} from "./friends/friends.component";

const routes: Routes = [
    {path: '', redirectTo: '/step1', pathMatch: 'full'},
    {path: 'step1', component: TotalBillComponent},
    {path: 'step2', component: FriendsComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
