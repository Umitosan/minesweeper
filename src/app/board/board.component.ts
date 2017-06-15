import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '../tile.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  gameBoard: any[] = [];

  constructor( ) { }

  ngOnInit( ) {
    // create gameBoard
    let tmpBoardArr: any[] = [];
    for (let row = 0; row < 10; row++) {
      let rowArr: any[] = [];
      for (let col = 0; col < 10; col++) {
        let newTile: Tile = new Tile(col,row,"unclicked",false);
        rowArr.push(newTile);
      }
      tmpBoardArr.push(rowArr);
    }
    this.gameBoard = tmpBoardArr;
  } // end INIT

  randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  setBombs() {
    let totalBombs: number = 10;
    while (totalBombs > 0) {
      let myRow: number = this.randomIntFromInterval(0,9);
      let myCol: number = this.randomIntFromInterval(0,9);
      this.gameBoard[myRow][myCol].bomb = true;
      totalBombs -= 1;
      console.log(this.gameBoard[myRow][myCol]);
    }
  }

  tileClicked(someTile) {
    if (someTile.bomb === true) {
      this.bombTriggered();
      this.gameBoard[someTile.tRow][someTile.tCol].status = "bomb";
    }

    if (someTile.status === "unclicked") {
      this.gameBoard[someTile.tRow][someTile.tCol].status = "flagged";
    } else if (someTile.status === "flagged") {
      this.gameBoard[someTile.tRow][someTile.tCol].status = "clean";
    }
  }

  bombTriggered() {
    console.log("BOOOM!");
  }

  findTileByXY(someCol, someRow) {
    let foundTile: Tile;
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        if ( ((this.gameBoard[i][j].tRow === someRow)&&(this.gameBoard[i][j].tCol === someCol)) ) {
          foundTile = this.gameBoard[i][j];
        }
      }
    }
    return foundTile
  }

}


// TILE params
// tCol: number
// tRow: number
// status: string
// bomb: boolean
