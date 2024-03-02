const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, P, Q] = stdin.split(' ').map(Number);

// -------------
// 풀이
// -------------
function solution(n, p, q) {
  const hash = new Map();
  const dfs = (i) => {
    if (i === 0) return 1;

    if (hash.has(i)) {
      return hash.get(i);
    }

    hash.set(i, dfs(Math.floor(i / p)) + dfs(Math.floor(i / q)));
    return hash.get(i);
  }

  return dfs(n);
}

// -------------
// 출력
// -------------
const result = solution(N, P, Q);
console.log(result);

// [접근]
// 문제에서 A(N)의 값을 구해야한다.
// 문제에서 N의 값과 P, Q의 값 그리고 A(0)의 값이 주어진다.
// A(N)을 구하는 가장 효율적인 방법은 DP를 이용하는 것인데 어떻게 시작하면 될 지가 관건이다.
// A(N) 이라는 막연한 값을 구해야 하는데 A(0)의 값이 1이라는 것은 알고 있다.
// 바로 이 값을 이용하여 구하면된다.

// 문제에서 Ai = A⌊i/P⌋ + A⌊i/Q⌋ 이라는 식이 주어지는데 이는 점화식으로 풀이에 활용하면 된다.
// A(N) = A(i/P) + A(i/Q) 에서 "i / P"와 "i / Q" 의 값이 재귀 탐색을 통해 계속 나누어 지면
// 언젠가는 최소값(몫)으로 0이 나오게 된다.

// - A(7) = A(7/P) + A(7/Q)
// - A(7) = (A(7 / P) = A((7 / P) / P) + A((7 / P) / Q)) + (A(7 / Q) = A((7 / Q) / P) + A((7 / Q) / Q))
// ...
// - A(7) = ... + (A(0) + A(0))

// 위 예시 처럼 "Top-Down" 방식으로 A(N)에서 부터 A(0)까지 재귀함수를 호출하고, 역순으로 반환값을 반환 하면서 값을 Map에 할당하게 된다.
