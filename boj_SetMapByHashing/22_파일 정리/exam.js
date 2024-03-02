const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...FILES] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, files) {
  const extentionMap = new Map();
  
  files.forEach((file) => {
    const [_, name] = file.split('.');
    extentionMap.set(name, (extentionMap.get(name) ?? 0) + 1);
  });

  return [...extentionMap.keys()]
    .sort()
    .map(name => `${name} ${extentionMap.get(name)}`)
    .join('\n');
}

// -------------
// 출력
// -------------
const result = solution(+N, FILES);
console.log(result);