const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이 1 (메모리 초과)
// -------------
function solution1(input) {
  const answer = [];
  let set = new Set();
  let cnt = 0;
  for (let i = 1, len = input.length; i < len; i++) {
    const num = input[i].trim();
    if (num[2]) {
      answer.push(cnt);
      set = new Set();
      cnt = 0;
      continue;
    }
    
    set.has(num[0]) ? cnt++ : set.add(num[0]);
  }

  return answer.join('\n');
}

// -------------
// 풀이 2
// -------------
function solution2(input) {
  const answer = [];
  let idx = 0;
  while (idx < input.length - 1) {
    const [N, M] = input[idx++].split(' ').map(Number);
    let pointer1 = idx;
    let pointer2 = idx + N;
    let cnt = 0;
    while ((pointer1 < N + idx) && (pointer2 < N + M + idx)) {
      if (Number(input[pointer1]) < Number(input[pointer2])) {
        pointer1++;
        continue;
      }
      if (Number(input[pointer1]) > Number(input[pointer2])) {
        pointer2++;
        continue;
      }
      cnt++;
      pointer1++;
      pointer2++;
    }
    answer.push(cnt);
    idx += (N + M);
  }

  return answer.join('\n');
}

// -------------
// 출력
// -------------
const result1 = solution1(input);
const result2 = solution2(input);
console.log(result1);
console.log(result2);

// [접근]
// N과 M이 최대 100만건 일 경우에 Set, Map 의 해시 자료구조 사용 시 메모리 초과가 발생하게 된다.
// 중요한 건 문제의 의도 또한 자료구조가 아닌 투 포인터를 활용하여 정답을 구해야 한다.
// 또한 N, M개의 CD의 번호가 이미 오름차순으로 정렬되어 있어 시간초과 없이 투 포인터 알고리즘으로 구현이 가능하다.