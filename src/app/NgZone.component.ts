import {
  Component, NgZone, OnChanges, SimpleChanges, DoCheck, ChangeDetectionStrategy
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ng-zone-demo',
  template: `
    <h2>Demo: NgZone</h2>
    <!--<div>
      <img src="asset/ZoneJS.png">HI</img>
    </div>-->

    <p>Progress: {{progress}}%</p>
    <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>

    <button (click)="processWithinAngularZone()">Process within Angular zone</button>
    <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
    <button (click)="runTask()">runTask</button>
  `,
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class NgZoneDemo implements OnChanges, DoCheck {
  progress: number = 0;
  label: string;

  constructor(private _ngZone: NgZone) { }

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => { console.log('Outside Done!'); });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log("ngOnChanges :", changes);
  }

  ngDoCheck() {
    // ...
    console.log("ngDoCheck :");
  }

  runTask() {
    console.log('script start');

    setTimeout(function () {
      console.log('setTimeout');
    }, 0);

    Promise.resolve().then(function () {
      console.log('promise1');
    });

    console.log('script end');

    Promise.resolve().then(function () {
      console.log('promise 2');
    });
  }

}