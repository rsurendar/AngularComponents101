import { Component , Input , OnInit , Output, OnChanges  , OnDestroy , EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit , OnChanges ,OnDestroy  {


@Input() init: number = null;
@Output() onDecrease = new EventEmitter<number>();
@Output() onComplete = new EventEmitter<void>();
public counter: number = 0;
private countdownTimerRef:any = null;
  constructor() { }
startCountdown() {
  if (this.init && this.init > 0 ) {
    this.clearTimeOut();
    this.counter = this.init;
    this.doCountdown();
  }
}
doCountdown() {
  this.countdownTimerRef = setTimeout(() => {
  this.counter = this.counter - 1;
  this.processCountdown();
  }, 1000);

}
private clearTimeOut() {
  if(this.countdownTimerRef){
  clearTimeout(this.countdownTimerRef);
    this.countdownTimerRef = null;
  }
}
processCountdown() {
  this.onDecrease.emit(this.counter);
  console.log('count is ' , this.counter);
  if (this.counter == 0) {
// emit event Counter END
console.log('__counter end --');
  }else {
    this.doCountdown();
  }
}
ngOnChanges(changes: SimpleChanges): void {
  console.log('init vlaue updated to:' , changes.init.currentValue);
  this.startCountdown();

  }
  ngOnDestroy(): void {
    this.clearTimeOut();
    }
    ngOnInit(): void {
    this.startCountdown();
    }
}
 