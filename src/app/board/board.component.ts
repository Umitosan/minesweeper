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
        let newTile: Tile = new Tile(col,row,"clean",false);
        rowArr.push(newTile);
      }
      tmpBoardArr.push(rowArr);
    }
    this.gameBoard = tmpBoardArr;
    // console.log("gameboard = ", this.gameBoard);
  }

  // findTileByXY(someX, someY) {
  //   let foundTile: Tile;
  //   for (let i=0; i<this.gameBoard.length; i++) {
  //     if ( (this.gameBoard[i].xPos === someX) && (this.gameBoard[i].yPos === someY) ) {
  //       foundTile = this.gameBoard[i];
  //     }
  //   }
  //   return foundTile
  // }


}


// TILE params
// xPos: number
// yPos: number
// status: string
// bomb: boolean
