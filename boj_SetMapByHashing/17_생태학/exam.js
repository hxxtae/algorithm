const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(input) {
  const maps = new Map();
  let totalCnt = 0;
  
  const getFixValue = (val) =>
    ((val / totalCnt) * 100).toFixed(4);

  input.forEach((name) => {
    maps.set(name, (maps.get(name) ?? 0) + 1);
    totalCnt++;
  });
  
  return [...maps.keys()]
    .sort()
    .map((name) => `${name} ${getFixValue(maps.get(name))}`)
    .join('\n');
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);
