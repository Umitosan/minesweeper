import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '../tile.model';
import { Highscore } from '../models/highscore.model';
import { HighscoresService } from '../providers/highscores.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  highScoresSub: Subscription;
  highscores: any[];
  gameBoard: any[] = [];
  bombsTotalMain: number;
  bombsRemainStr: string = '010';
  bombsRemainCount: number = 10;
  gameStatus: string = "init"; // init play lose win
  BOARDSIZE: number = 10;
  BOARDBOMBS: number = 12;
  gameStartTime: number = 0;
  playTime: number = 0;
  playTimeStr: string = '000';
  playerName: string = 'john doe';
  formShow: string = 'show';

  constructor( public highScoreServ: HighscoresService ) {
    this.highScoresSub = highScoreServ.getScores().subscribe(data => {
      this.highscores = data;
      // console.log("this.highscores at board: ", data);
    });
  }

  ngOnInit() {
    this.boardInit();
    this.gameStatus = "init";
    setInterval(()=>{ this.updateTimer() },200);
  }

  boardInit() {
    // create gameBoard
    let tmpBoardArr: any[] = [];
    for (let row = 0; row < this.BOARDSIZE; row++) {
      let rowArr: any[] = [];
      for (let col = 0; col < this.BOARDSIZE; col++) {
        let newTile: Tile = new Tile(col,row,"unclicked",0,false);
        rowArr.push(newTile);
      }
      tmpBoardArr.push(rowArr);
    }
    this.gameBoard = tmpBoardArr;
    this.setBombs();
    // traverse board and set bomb score
    for (let i=0; i<this.BOARDSIZE; i++) {
      for (let j=0; j<this.BOARDSIZE; j++) {
        this.setBombScore(i,j);
      }
    }
  }

  hideForm() {
    this.formShow = 'hide';
  }

  startPlay() {
    this.gameStatus = "play";
    this.gameStartTime = performance.now();
  }

  smileClicked() {
    this.boardInit();
    this.playTime = 0;
    this.playTimeStr = '000';
    this.gameStatus = "init";
    this.bombsRemainStr = '010';
    this.bombsRemainCount = 10;
  }

  updateTimer() {
    if (this.gameStatus === 'play') {
      this.playTime = Math.round( (performance.now() - this.gameStartTime) / 1000 );
      let timeStr = this.playTime.toString();
      let pt;
      if (timeStr.length === 1) {
        pt = "00"+timeStr;
      } else if ( timeStr.length === 2) {
        pt = "0"+timeStr;
      } else {
        // console.log("updateTimer 3 or more digets");
      }
      // console.log('play time = ', pt);
      this.playTimeStr = pt;
    } // if
  }

  updateBombsCount(numToAdd) {
    this.bombsRemainCount += numToAdd;
    let tmpStr = this.bombsRemainCount.toString();
    let outputStr;
    if (tmpStr.length === 1) {
      outputStr = "00"+tmpStr;
    } else if ( tmpStr.length === 2) {
      outputStr = "0"+tmpStr;
    } else {
      // nottin
    }
    this.bombsRemainStr = outputStr;
  }

  saveHighScore(nameToSave,scoreToSave) {
    this.highScoreServ.saveScore(nameToSave,scoreToSave);
  }

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
    let totalBombs: number = this.BOARDBOMBS;
    this.bombsTotalMain = totalBombs;
    while (totalBombs > 0) {
      let myRow: number = this.randomIntFromInterval(0,this.BOARDSIZE-1);
      let myCol: number = this.randomIntFromInterval(0,this.BOARDSIZE-1);
      if ( this.gameBoard[myRow][myCol].bomb === false ) {
        this.gameBoard[myRow][myCol].bomb = true;
        totalBombs -= 1;
        // console.log("c:",this.gameBoard[myRow][myCol].tCol,"r:",this.gameBoard[myRow][myCol].tRow);
      }
    }
  }

  tileClicked(someTile) {
    // prevent left-click if flagged OR game over
    if (this.gameStatus === 'init') { this.startPlay(); }
    if ((this.gameBoard[someTile.tRow][someTile.tCol].status !== 'flagged') && (this.gameStatus === 'play')) {
          // normal left click
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
    this.checkGameWin();
  }

  tileRightClicked(event, someTile) {
    event.preventDefault();
    if (this.gameStatus === 'play') {
          if (this.gameBoard[someTile.tRow][someTile.tCol].status === 'flagged') {
            this.gameBoard[someTile.tRow][someTile.tCol].status = 'unclicked';
            this.updateBombsCount(1);
          } else if (this.gameBoard[someTile.tRow][someTile.tCol].status === 'unclicked') {
            this.gameBoard[someTile.tRow][someTile.tCol].status = 'flagged';
            this.updateBombsCount(-1);
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
    this.showAllBombs();
    this.gameBoard[thisTile.tRow][thisTile.tCol].status = "bombRed";
    this.gameLose();
  }

  showAllBombs() {
    for (let i=0; i<this.BOARDSIZE; i++) {
      for (let j=0; j<this.BOARDSIZE; j++) {
        if (this.gameBoard[i][j].bomb === true) {
          this.gameBoard[i][j].status = "bomb";
        }
      }
    }
  }

  gameLose() {
    this.gameStatus = "lose";
  }

  checkGameWin() {
    let count: number = 0;

    for (let i=0; i<this.BOARDSIZE; i++) {
      for (let j=0; j<this.BOARDSIZE; j++) {
        if ((this.gameBoard[i][j].status === "unclicked") || (this.gameBoard[i][j].status === "flagged")) {
          count += 1;
        }
      }
    }
    if (count === this.bombsTotalMain) {
      this.gameStatus = "win";
    }
  }

  ngOnDestroy() {
    this.highScoresSub.unsubscribe();
  }

}


// TILE params

// tCol: number
// tRow: number
// status: string
// bomb: boolean
// bombScore: number
