const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const [[NA, NB], A_ARR, B_ARR] = input;

// -------------
// 풀이
// -------------
function solution(na, nb, aArr, bArr) {
  const bSet = new Set(bArr);
  let filterA = aArr.filter((num) => bSet.has(num) ? false : true);
  filterA.sort((a, b) => +a - +b);
  
  return filterA.length ? [filterA.length, filterA.join(' ')].join('\n') : 0;
}


// -------------
// 출력
// -------------
const result = solution(NA, NB, A_ARR, B_ARR);
console.log(result);

// [접근]
// 문제는 단순하다. A의 차칩합의 원소를 구하면된다.
// 풀이 역시 단순하다.
// B집합의 원소를 해시로 두고, A집합의 원소를 반복하면서 B집합과 같은 원소를 제외한 원소만을 필터해 주면 된다.
// 차칩합 원소의 개수가 0개이면 0을 출력해 주면 된다.
