// 풀이 1.
function solution1(score) {
  // [인덱스, 평균, 등수]
  const ave = (list, len) => list.reduce((sum, num) => sum += num) / len;
  score = score
      .map((v, i) => [i, ave(score[i], score[i].length), 0])
      .sort((a, b) => b[1] - a[1]);
  
  for(let i = 0, len = score.length; i < len; i++) {
      if(i === 0) {
          score[i][2] = i+1;
          continue;
      }
      const [prevAve, prevRank] = [score[i-1][1], score[i-1][2]];
      const currAve = score[i][1];
      if(currAve === prevAve) score[i][2] = prevRank;
      else score[i][2] = i+1;
  }
  
  return score.sort((a, b) => a[0] - b[0]).map(arr => arr[2]);
}

// [접근]
// [인덱스, 평균, 등수] 의 배열을 만들어 등수 매기기

// 풀이 2.
function solution2(score) {
  const ave = (list, len) => list.reduce((sum, num) => sum += num) / len;
  const aveList =  score.map((v, i) => ave(score[i], score[i].length));
  const sortList = [...aveList].sort((a, b) => b - a);
  return aveList.map((num) => sortList.indexOf(num) + 1);
}

// [접근]
// indexOf를 활용하여 등수 매기기

// 풀이 3.
function solution(score) {
  const ave = (list) => list.reduce((sum, curr) => sum + curr) / list.length;
  const aveList = score.map((list) => ave(list));
  return aveList.map((numA) => aveList.filter((numB) => numA < numB).length+1);
}

// [접근]
// filter를 활용하여 등수 매기기