function solution(picks, minerals) {
  const mineralKinds = ['diamond', 'iron', 'stone'];
  const len = mineralKinds.length;
  const mlen = minerals.length;
  const picksCount = picks.reduce((sum, num) => sum += num);
  // 곡괭이 종류별 개수 (picks)
  picks = picks.map((cnt, idx) => [mineralKinds[idx], cnt]);
  // 곡괭이 & 광물 피로도 (table)
  const table = new Map(mineralKinds.map((kind) => [kind, {}]));
  for(let i = 0; i < len; i++) {
    const kindRow = mineralKinds[i];
    for(let j = 0; j < len; j++) {
      const kindCol = mineralKinds[j];
      table.get(kindRow)[kindCol] = 5 ** (i-j < 0 ? 0 : i-j);
    }
  }
  // 광물 5개씩 묶어서 높은 피로도 순으로 재정렬 (mineralArr)
  // (곡괭이 개수 외 광물은 버림)
  // (광물 5개씩 묶어서 순서 상관없음)
  const mineralArr = [];
  for(let i = 0; i < mlen; i+=5) {
    const range = minerals.slice(i, i+5);
    const sumTired = range.reduce((sum, mineral) => sum += table.get('stone')[mineral], 0);
    mineralArr.push([range, sumTired]);
  }
  mineralArr.splice(picksCount);
  mineralArr.sort((a, b) => b[1] - a[1]);
  let totalTired = 0;
  const tiredCheck = (arr, pick) => arr.reduce((sum, mineral) => sum += table.get(pick)[mineral], 0);
  while(mineralArr.length) {
    const [range, sum] = mineralArr.shift();
    // diamond
    if(picks[0][1] > 0) {
      totalTired += tiredCheck(range, picks[0][0]);
      picks[0][1]--;
      continue;
    }
    // iron
    if(picks[1][1] > 0) {
      totalTired += tiredCheck(range, picks[1][0]);
      picks[1][1]--;
      continue;
    }
    // stone
    if(picks[2][1] > 0) {
      totalTired += tiredCheck(range, picks[2][0]);
      picks[2][1]--;
      continue;
    }
  }
  return totalTired;   
}

// NOTE: 그리디 알고리즘

// [문제 보충 설명]
// 한 번 사용하기 시작한 곡괭이는 사용할 수 없을 때까지 사용합니다.
// -> 선택한 곡괭이는 광물 5개를 캔 후 더이상 사용할 수 없으며, 
//    5개 전부 캘 때 까지 변경할 수 없다.

// [접근]
// - 피로도가 가장 높은 경우는 다이아몬드를 돌 곡괭이로 캘 때 입니다.
// - 광물들을 5개씩 묶어서 돌 곡괭이로 캤을 때 피로도를 저장하고 -> [[광물1, 광물2, 광물3, 광물4, 광물5], 피로도]
//   그 다음 피로도 기준 내림 차순 정렬한뒤, 
//   picks의 다이아몬드 곡괭이 부터 소모시켜 5개씩 묶은 광물들을 캔 피로도를 모두 더함니다.

