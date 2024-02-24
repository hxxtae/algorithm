const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, ...LOGS] = input;

// -------------
// 풀이 1
// -------------
function solution1(n, logs) {
  const gomgomArr = [];
  logs.forEach((item) => item === "ENTER" ?
    gomgomArr.push(new Set) :
    gomgomArr[gomgomArr.length - 1].add(item));
  
  return gomgomArr.reduce((sum, set) => sum + set.size, 0);
}

// -------------
// 풀이 2
// -------------
function solution2(n, logs) {
  const gomgomSet = new Set();
  let totalCnt = 0;
  logs.push("ENTER");
  logs.forEach((item) => {
    if (item === "ENTER") {
      totalCnt += gomgomSet.size;
      gomgomSet.clear();
      return;
    }
    gomgomSet.add(item);
  });

  return totalCnt;
}

// -------------
// 출력
// -------------
const result1 = solution1(+N, LOGS);
const result2 = solution2(+N, LOGS);
console.log(result1);
console.log(result2);