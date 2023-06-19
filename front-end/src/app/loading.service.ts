import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public isLoading: boolean = false;

    constructor() { }

    show(): void {
        setTimeout(() => {
            this.isLoading = true;
        }, 0);
    }

    hide(): void {
        setTimeout(() => {
            this.isLoading = false;
        }, 0);
    }
}