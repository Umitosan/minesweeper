import { Pipe, PipeTransform } from '@angular/core';
import { Highscore } from './models/highscore.model';

@Pipe({
  name: 'rank',
  pure: true
})
export class RankPipe implements PipeTransform {

  transform(highScoreList: Highscore[]) {
    let sortedArr = [];
    for (let i=0; i < highScoreList.length; i++) {
      sortedArr.push(highScoreList[i]);
    }

    let swapCount = 1;
    while (swapCount > 0) {
      swapCount = 0;
      for (let i=0; i < sortedArr.length-1; i++) {
        if (sortedArr[i].score > sortedArr[i+1].score) {
          let item1 = sortedArr[i];
          let item2 = sortedArr[i+1];
          sortedArr[i] = item2;
          sortedArr[i+1] = item1;
          swapCount += 1;
        } else {
          // nothin
        }
      }
    }
    console.log("sortedArr after sort: ", sortedArr);
    return sortedArr;
  } // class

}
