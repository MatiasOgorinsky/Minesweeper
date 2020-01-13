import { Component } from '@angular/core';
import { Tabla } from './components/tabla';
import { Celda } from './components/celda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'minesweeper';
  board: Tabla;
  // para el contador
  contador:any;
  running: boolean = false;
  timerRef;



  constructor() {
    this.reset();
  }

  contar(){
    this.running=!this.running;
    if(this.running){
      const startTime = Date.now() - (this.contador || 0);
      this.timerRef = setInterval(() => {
      this.contador = (Date.now() - startTime)/1000;
    });
  }else {
      clearInterval(this.timerRef);
    }
  } 
  clearTimer() {
    this.running = false;
    this.contador = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  checkCell(cell: Celda) {
    if(!this.running){
       this.contar();
    }
    const result = this.board.checkCelda(cell);
    if (result === 'gameover') {
      alert('Perdiste');
      this.clearTimer();
    } else if (result === 'win') {
      alert('Ganador!');
      this.clearTimer();
    }
  }
  flag(cell: Celda) {
    if (cell.status === 'flag') {
      cell.status = 'open';
    } else {
      cell.status = 'flag';
    }
  }

  reset() {
    this.board = new Tabla(15, 50);
    this.clearTimer();
  
  }
}
