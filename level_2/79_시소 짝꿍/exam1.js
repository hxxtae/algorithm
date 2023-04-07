// 풀이 1.
function solution1(weights) {
  const dis1 = new Map();
  const dis2 = new Map();
  const dis3 = new Map();
  const dis4 = new Map();
  const len = weights.length;
  const distanceOfWeight = (weight, dis) => weight * dis;
  
  // accCnt : 누적 카운트
  // accKindCnt : 누적 종류 카운트
  const accSameWeightKind = (map, weight) => {
    const accCnt = map.get(weight) ? (map.get(weight)[0] + map.get(weight)[1]) : 0;
    const accKindCnt = map.get(weight) ? map.get(weight)[1] + 1 : 1;
    map.set(weight, [accCnt, accKindCnt]);
  }
  const accWeightKind = (map, weight) => {
    const accCnt = map.get(weight) ? map.get(weight)[0] : 0;
    const accKindCnt = map.get(weight) ? map.get(weight)[1] + 1 : 1;
    map.set(weight, [accCnt, accKindCnt]);
  }
  const balanceChk = (map, weight) => {
    if(!map.get(weight)) return;
    const accCnt = map.get(weight)[0] + map.get(weight)[1];
    const accKindCnt = map.get(weight)[1];
    map.set(weight, [accCnt, accKindCnt]);
  }
  const matchCount = (map, count = 0) => {
    for(const [cnt, kind] of map.values()) count += cnt;
    return count;
  }
  
  for(let i = 0; i < len; i++) {
    const weight = weights[i];
    for(let d = 1; d <= 4; d++) {
      const disWeight = distanceOfWeight(weight, d);
      if(d === 1) {
        accSameWeightKind(dis1, disWeight);
      } else if(d === 2) {
        accWeightKind(dis2, disWeight);
        balanceChk(dis3, disWeight);
        balanceChk(dis4, disWeight);
      } else if(d === 3) {
        accWeightKind(dis3, disWeight);
        balanceChk(dis2, disWeight);
        balanceChk(dis4, disWeight);
      } else if(d === 4) {
        accWeightKind(dis4, disWeight);
        balanceChk(dis2, disWeight);
        balanceChk(dis3, disWeight);
      }
    }
  }
  return matchCount(dis1) + matchCount(dis2) + matchCount(dis3) + matchCount(dis4);
}

// [접근]
// weight: [무게, 무게*2, 무게*3, 무게*4]
// 100: [ 100, 200, 300, 400 ],
// 180: [ 180, 360, 540, 720 ],
// 360: [ 360, 720, 1080, 1440 ],
// 100: [ 100, 200, 300, 400 ],
// ▷270: [ 270, 540, 810, 1080 ]

// [a, b]
// a: 벨런스가 맞는 무게 카운트
// b: 해당 무게 종류의 개수

// - 같은 무게인 경우만 비교
// 1(Same Weight)
// {
//   100: [1, 2],
//   180: [0, 1],
//   360: [0, 1]
//   270: [0, 1]
// }

// - 2m 거리에서 3m, 4m 거리에서의 무게 비교
// 2m
// {
//   200: [0, 1]
//   360: [0, 1]
//   720: [0, 1]
//   540: [0, 1]
// }

// - 3m 거리에서 2m, 4m 거리에서의 무게 비교
// 3m
// {
//   300: [0, 1]
//   540: [2, 1]
//   810: [0, 1]
// }

// - 4m 거리에서 2m, 3m 거리에서의 무게 비교
// 4m
// {
//   400: [0, 1]
//   720: [1, 1]
// }


// 풀이 2.
function solution2(weights) {
  const hash = weights.reduce((a, c) => (a[c] = (a[c] ?? 0) + 1, a), {});
  const rates = [1, 4/3, 4/2, 3/2, 3/4, 2/4, 2/3];

  return weights.reduce((acc, weight) => {
    const result = acc + rates.reduce((total, rate) =>
      total + (hash[weight*rate] >= 1 ? hash[weight*rate] : 0) + (rate === 1 ? -1 : 0)
    , 0)

    hash[weight]--
    return result
  }, 0)
}
