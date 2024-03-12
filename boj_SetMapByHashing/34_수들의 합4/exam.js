const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [[N, K], ARR] = stdin.split('\n').map(item => item.trim().split(' ').map(Number));

// -------------
// 풀이
// -------------
function solution(n, k, arr) {
  const map = new Map();
  let sum = 0;
  let answer = 0;

  for (let i = 0; i < n; i++) {
    // 1. 0에서 부터 N까지의 모든 부분 누적합 구하기
    sum += arr[i];
    if (sum === k) answer++;

    // 2. 현재까지 누적합 중에서 (누적합 - 이전 누적합 = k) 를
    // 각각 [k]와 [이전 누적합]을 이항하여 (누적합 - k = 이전 누적합)이 되며,
    // 즉, 이전 누적합이 해시에 존재한다면 개수 추가
    const prevSum = (sum - k);
    if (map.has(prevSum)) {
      answer += map.get(prevSum);
    }
    // 누적합 해시값 갱신
    map.set(sum, (map.get(sum) ?? 0) + 1);
  }
  
  return answer;
}

// -------------
// 출력
// -------------
const result = solution(N, K, ARR);
console.log(result);

// [접근]
// 문제의 요구하는 바는 부분 리스트의 합이 K인 경우의 개수를 구하면 된다.
// - 부분 리스트는 1자리에서 부터 N개의 리스트가 될 수 있으며, 시작 위치도 0에서 부터 N까지 다양하다.
// 부분 누적합을 통해 즉, 누적합 알고리즘을 통해 문제의 답을 구할 수 있다.

// 1. 0에서 부터 N까지의 모든 부분 누적합을 구하여 K인 경우의 개수를 구할 수 있다.

// 2. 다음은 위에서 구한 누적합에서 다른 누적합을 뺀 경우가 K인 경우를 구할 수 있다.
//    - 이를 다르게 해석하면,
//      위에서 구한 부분 리스트(1번)에서 해당 부분 리스트의 길이 보다 작은 길이의 부분 리스트를 빼고,
//      나머지 부분 리스트의 누적합이 K인 경우를 구할 수 있댜.

// ※ 그런데 answer += map.get(prevSum) 에서 왜 해시값을 더해주어야 하는지 이해가 가질 않는다...
