export class Celda {
  status: 'open' | 'clear' | 'flag' = 'open';
  mine = false;
  proximityMines = 0;

  constructor(public row: number, public column: number) {}
}
