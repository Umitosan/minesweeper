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
        let newTile: Tile = new Tile(col,row,"unclicked",0,false);
        rowArr.push(newTile);
      }
      tmpBoardArr.push(rowArr);
    }
    this.gameBoard = tmpBoardArr;
    this.setBombs();
    // traverse board and set bomb score
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        this.setBombScore(i,j);
      }
    }
    // document.addEventListener('contextmenu', function(e) {  // right-click listener
    //         console.log("right-click happened");
    //         e.preventDefault();
    // });
  } // end INIT

  randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  setBombScore(row, col) {
    let foundBombScore: number = 0;
    if (this.gameBoard[row][col + 1]) {
      if (this.gameBoard[row][col + 1].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col + 1]) {
      if (this.gameBoard[row + 1][col + 1].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col]) {
      if (this.gameBoard[row + 1][col].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col - 1]) {
      if (this.gameBoard[row + 1][col - 1].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row][col - 1 ]) {
      if (this.gameBoard[row][col - 1 ].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col - 1]) {
      if (this.gameBoard[row - 1][col - 1].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col]) {
      if (this.gameBoard[row - 1][col].bomb === true)  { foundBombScore += 1; }
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col + 1]) {
      if (this.gameBoard[row - 1][col + 1].bomb === true)  { foundBombScore += 1; }
    }
    this.gameBoard[row][col].bombScore = foundBombScore;
  }

  setBombs() {
    let totalBombs: number = 11;
    while (totalBombs > 0) {
      let myRow: number = this.randomIntFromInterval(0,9);
      let myCol: number = this.randomIntFromInterval(0,9);
      if ( this.gameBoard[myRow][myCol].bomb === false ) {
        this.gameBoard[myRow][myCol].bomb = true;
        totalBombs -= 1;
        console.log("c:",this.gameBoard[myRow][myCol].tCol,"r:",this.gameBoard[myRow][myCol].tRow);
      }
    }
  }

  tileClicked(someTile) {
    if (someTile.bomb === true) {
      this.bombTriggered(someTile);
    } else if (someTile.status === "unclicked") {
      // reveal tile
      if (someTile.bombScore === 0) {
        someTile.status = "clean";
        //reveal adjacent tiles
        this.revealAdjacent(someTile.tRow, someTile.tCol);
      } else {
        someTile.status = "number";
      }
    }
  }

  revealAdjacent(row, col) {
    if (this.gameBoard[row][col + 1]) {
      this.tileClicked(this.gameBoard[row][col + 1]);
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col + 1]) {
      this.tileClicked(this.gameBoard[row + 1][col + 1]);
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col]) {
      this.tileClicked(this.gameBoard[row + 1][col]);
    }
    if ( this.gameBoard[row + 1] && this.gameBoard[row + 1][col - 1]) {
      this.tileClicked(this.gameBoard[row + 1][col - 1]);
    }
    if ( this.gameBoard[row][col - 1 ]) {
      this.tileClicked(this.gameBoard[row][col - 1 ]);
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col - 1]) {
      this.tileClicked(this.gameBoard[row - 1][col - 1]);
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col]) {
      this.tileClicked(this.gameBoard[row - 1][col]);
    }
    if ( this.gameBoard[row - 1] && this.gameBoard[row - 1][col + 1]) {
      this.tileClicked(this.gameBoard[row - 1][col + 1]);
    }
  }

  bombTriggered(thisTile) {
    console.log("BOOOM!");
    this.showAllBombs();
    this.gameBoard[thisTile.tRow][thisTile.tCol].status = "bombRed";
  }

  showAllBombs() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        if (this.gameBoard[i][j].bomb === true) {
          this.gameBoard[i][j].status = "bomb";
        }
      }
    }
  }

  // findTileByXY(someCol, someRow) {
  //   let foundTile: Tile;
  //   for (let i=0; i<10; i++) {
  //     for (let j=0; j<10; j++) {
  //       if ( ((this.gameBoard[i][j].tRow === someRow)&&(this.gameBoard[i][j].tCol === someCol)) ) {
  //         foundTile = this.gameBoard[i][j];
  //       }
  //     }
  //   }
  //   return foundTile
  // }

}


// TILE params
// tCol: number
// tRow: number
// status: string
// bomb: boolean
