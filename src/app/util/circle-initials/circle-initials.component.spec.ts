import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CircleInitialsComponent} from './circle-initials.component';

describe('CircleInitialsComponent', () => {
    let component: CircleInitialsComponent;
    let fixture: ComponentFixture<CircleInitialsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CircleInitialsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CircleInitialsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
