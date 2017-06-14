import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '../tile.model'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  gameBoard: Tile[] = [];

  constructor( ) { }

  ngOnInit( ) {
    // create baord tiles
    for (var yy = 1; yy < 11; yy++) {
      for (var xx = 1; xx < 11; xx++) {
        let newTile: Tile = new Tile(xx,yy,"clean",false);
        this.gameBoard.push(newTile);
      }
    }
    console.log(this.gameBoard);
  }

}


// TILE params
// xPos: number
// yPos: number
// status: string
// bomb: boolean
