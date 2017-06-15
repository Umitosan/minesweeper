import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '../tile.model'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  gameBoard: any[] = [];

  constructor( ) { }

  ngOnInit( ) {
    // create gameBoard with new tiles
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
  }

  tileClicked(someTile) {

    // update tile to be flagged
    this.gameBoard[someTile.tRow][someTile.tCol].status = "flagged";
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
