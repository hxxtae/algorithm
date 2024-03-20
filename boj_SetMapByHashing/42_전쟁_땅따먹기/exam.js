const fs = require('fs');

// -------------
// 입력 & 출력
// -------------
const input = fs.readFileSync('./input_1.txt').toString().trim().split('\n').map(item => item.trim());
const N = +input[0];
const answer = [];
const countMap = new Map(); // 풀이1
for (let i = 1; i <= N; i++) {
  const TARR = input[i].split(' ');
  const T = TARR.shift();
  answer.push(solution(T, TARR));
  countMap.clear(); // 풀이1
}
console.log(answer.join('\n'));

// -------------
// 풀이 1 (메모리 초과 -> Map)
// -------------
function solution(t, tArr) {
  let maxNum = 0;
  let maxCnt = 0;

  for (let j = 0; j < t; j++) {
    const num = tArr[j];
    countMap.set(num, (countMap.get(num) ?? 0) + 1);
    if (maxCnt < countMap.get(num)) {
      maxCnt = countMap.get(num);
      maxNum = num;
    }
  }

  if (maxCnt > (t / 2)) {
    return maxNum;
  }
  return "SYJKGW";
}

// -------------
// 풀이 2
// -------------
function solution(t, tArr) {
  let maxNum = 0;
  let maxCnt = 0;

  for (let j = 0; j < t; j++) {
    const num = +tArr[j];
    
    // 후보 교체
    if (maxCnt === 0) {
      maxNum = num;
    }
    // 후보 누적 카운트
    if (maxNum === num) {
      maxCnt += 1;
    } else if (maxNum !== num) {
      maxCnt -= 1;
    }
  }

  let cnt = 0;
  for (const num of tArr) {
    +num === maxNum && cnt++;
  }

  if (cnt > (t / 2)) {
    return maxNum;
  }
  return "SYJKGW";
}
