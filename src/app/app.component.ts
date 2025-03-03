import { Component } from '@angular/core';
//using in c# controller
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//models with nullable values
export class AppComponent {
  title = 'First-Angular';
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

