const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => +item.trim());
const [N, K, ...CARDS] = input;

// -------------
// 풀이 1
// -------------
function solution1(n, k, cards) {
  const combinationArr = [];
  const permutationArr = [];
  const visited = Array.from({ length: 100 }, () => 0);

  // 조합 함수
  const combinationFunc = (deep, len, arr) => {
    if (len === k) {
      return combinationArr.push([...arr]);
    }
    for (let i = deep; i < n; i++) {
      arr.push(cards[i]);
      combinationFunc(i + 1, len + 1, arr);
      arr.pop();
    }
  }

  combinationFunc(0, 0, []);
  
  // 순열 (같은 자리수 반복을 제외)
  const permutationFunc = (comArr, cnt, str) => {
    if (cnt === k) {
      permutationArr.push(str);
      return;
    }
    for (let i = 0; i < k; i++) {
      const num = comArr[i];
      if (visited[i]) continue;
      visited[i] = 1;
      permutationFunc(comArr, cnt + 1, (str + num.toString()));
      visited[i] = 0;
    }
  }
  
  for (let i = 0; i < combinationArr.length; i++) {
    const arr = combinationArr[i];
    permutationFunc(arr, 0, '');
  }

  return new Set(permutationArr).size;
}

// -------------
// 풀이 2
// - 풀이 1에서 조합할 필요 없이 n개의 수에서 k개의 자리수를 가지는 '순열' 을 구하면 된다.
// - 순열도 마찬가지로 자리수 반복만 제외한다.
// -------------
function solution2(n, k, cards) {
  const visited = Array.from({ length: 100 }, () => 0);
  const permutationArr = [];

  const permutationFunc = (cnt, str) => {
    if (cnt === k) {
      permutationArr.push(str);
      return;
    }
    for (let i = 0; i < n; i++) {
      const num = cards[i];
      if (visited[i]) continue;
      visited[i] = 1;
      permutationFunc(cnt + 1, str + num.toString());
      visited[i] = 0
    }
  }
  permutationFunc(0, '');

  return new Set(permutationArr).size;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, K, CARDS);
const result2 = solution2(N, K, CARDS);
console.log(result1);
console.log(result2);