import { Component } from '@angular/core';

@Component({
  selector: 'app-time-keeping',
  templateUrl: './time-keeping.component.html',
  styleUrls: ['./time-keeping.component.css']
})
export class TimeKeepingComponent {
  title = 'JiTech';
  count: number = 0;

  inputText: string = "Input Value";

  //functions
incrementCount() {
  this.count++;
}

decrementCount(){
  this.count--;
}

restartCount(){
  this.count = 0;
}

}
