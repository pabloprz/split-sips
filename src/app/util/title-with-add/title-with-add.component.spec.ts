import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TitleWithAddComponent} from './title-with-add.component';

describe('TitleWithAddComponent', () => {
    let component: TitleWithAddComponent;
    let fixture: ComponentFixture<TitleWithAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TitleWithAddComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TitleWithAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
