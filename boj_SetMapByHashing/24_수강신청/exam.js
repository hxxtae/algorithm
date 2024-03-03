const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [KL, ...STUDENT_IDS] = stdin.split('\n').map(item => item.trim());
const [K, L] = KL.split(' ').map(Number);

// -------------
// 풀이 1
// -------------
function solution1(k, l, studentIds) {
  const orderMap = new Map();
  studentIds.forEach((id, idx) => {
    orderMap.set(id, idx);
  });

  return [...orderMap.keys()]
    .sort((a, b) => orderMap.get(a) - orderMap.get(b))
    .slice(0, k)
    .join('\n');
}

// -------------
// 풀이 2
// -------------
function solution2(k, l, studentIds) {
  const set = new Set(studentIds.reverse());
  
  return [...set]
    .slice(set.size - k)
    .reverse()
    .join('\n');
}

// -------------
// 출력
// -------------
const result1 = solution1(K, L, STUDENT_IDS);
const result2 = solution2(K, L, STUDENT_IDS);
console.log(result1);
console.log('---');
console.log(result2);
