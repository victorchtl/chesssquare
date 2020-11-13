import { element } from 'protractor';
import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  squares = [
    'a8', 'a7', 'a6', 'a5', 'a4', 'a3', 'a2', 'a1',
    'b8', 'b7', 'b6', 'b5', 'b4', 'b3', 'b2', 'b1',
    'c8', 'c7', 'c6', 'c5', 'c4', 'c3', 'c2', 'c1',
    'd8', 'd7', 'd6', 'd5', 'd4', 'd3', 'd2', 'd1',
    'e8', 'e7', 'e6', 'e5', 'e4', 'e3', 'e2', 'e1',
    'f8', 'f7', 'f6', 'f5', 'f4', 'f3', 'f2', 'f1',
    'g8', 'g7', 'g6', 'g5', 'g4', 'g3', 'g2', 'g1',
    'h8', 'h7', 'h6', 'h5', 'h4', 'h3', 'h2', 'h1'
  ];

  test1 = [
    12, 24, 36, 48
  ]

  test1avg;

  randomValue = "Square to find";

  clock: any;
  seconds: any = '0';
  milliseconds: any = '00';
  averageSeconds: any = '0';
  averageMilliseconds: any = '00';
  counter: number;
  secondsLaps: any = [];
  milliLaps: any = [];
  timerRef;
  running: boolean = false;
  i: number = 0;

  constructor() {
    console.log(this.randomValue);
  }

  ngOnInit() {
    this.test1avg = this.test1.reduce((a,b) => a + b, 0) / this.test1.length;
    console.log(this.test1avg);
  }

  start() {
      this.randomValue = this.squares[Math.floor(Math.random() * this.squares.length)];
      this.startTimer();
  }

  stop() {
    this.killTimer();
    this.i = 0;
    this.secondsLaps = [];
    this.milliLaps = [];
    this.randomValue = "Square to find";
  }

  match(event) {
    if (this.i < 5) {
      let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let id = idAttr.nodeValue;
    if (id === this.randomValue) {
      this.i++;
      console.log(this.i);
      console.log("it's a match!");
      let lapSecondsTime = this.seconds;
      let lapMilliTime = this.milliseconds;
      this.secondsLaps.push(lapSecondsTime);
      this.milliLaps.push(lapMilliTime);
      this.averageSeconds = Math.floor(this.secondsLaps.reduce((a,b) => a + b, 0) / this.secondsLaps.length);
      this.averageMilliseconds = Math.floor(this.milliLaps.reduce((a,b) => a + b, 0) / this.milliLaps.length);
      console.log(this.secondsLaps);
      console.log(this.milliLaps);
      this.clearTimer();
      this.randomValue = this.squares[Math.floor(Math.random() * this.squares.length)];
    } else {
      console.log("Wrong Square!");
    }
    } else {
      this.randomValue = "Your average time is" + this.averageSeconds + ':' + this.averageMilliseconds + 'seconds !';
      this.killTimer();
      this.i = 0;
      this.secondsLaps = [];
      this.milliLaps = [];
    }

  }

  startTimer() {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000);
        // if (Number(this.milliseconds) < 10) {
        //   this.milliseconds = '0' + this.milliseconds;
        // } else {
        //   this.milliseconds = '' + this.milliseconds;
        // }
        // if (Number(this.seconds) < 10) {
        //   this.seconds = '0' + this.seconds;
        // } else {
        //   this.seconds = '' + this.seconds;
        // }
      });
    }

    clearTimer() {
      clearInterval(this.timerRef);
      this.counter = undefined;
      this.milliseconds = 0;
      this.seconds = 0;
      this.startTimer();
    }

    killTimer() {
      clearInterval(this.timerRef);
      this.counter = undefined;
      this.milliseconds = 0;
      this.seconds = 0;
      this.averageSeconds = 0;
      this.averageMilliseconds = 0;
    }

}
