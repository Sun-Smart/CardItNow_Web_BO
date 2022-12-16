import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '../../../pages/core/services/session.service';
@Injectable()
/**
 * Theme provider service
 */
export class ThemeService {
    public theme: BehaviorSubject<string> = new BehaviorSubject<string>(this.sessionService.getItem("selected-theme"));

    constructor(public sessionService: SessionService) {

    }
    /**
     * 
     * @param value on selecting theme set theme variable globally
     */
    selectTheme(value: string) {
        this.theme.next(value);
    }
}