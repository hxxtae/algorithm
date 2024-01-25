const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin;

// -------------
// 풀이 (DFS)
// -------------
function solution(S) {
  const peoples = Array(3).fill(0); // index: 0 -> A / index: 1 -> B / index: 2 -> C
  const dp = Array.from({ length: 51 }, () =>
    Array.from({ length: 51 }, () =>
      Array.from({ length: 51 }, () =>
        Array.from({ length: 3 }, () => Array(3).fill(false)))));
  const result = Array(51).fill('');

  // 메모이제이션(DP) + 백트레킹
  const dfs = (a, b, c, back_2, back_1) => {
    // true의미 : 탐색이 유효하므로(올바른 출근 기록) 탐색(재귀)을 빠져나간다.
    // false의미 : 현재 탐색은 이미 탐색하였거나, 규칙에 어긋나 탐색이 유효하지 않으므로 현재 탐색을 반려한다.
    if (a === peoples[0] && b === peoples[1] && c === peoples[2])
      return true;

    if (dp[a][b][c][back_2][back_1]) return false;
    dp[a][b][c][back_2][back_1] = true;

    if (a + 1 <= peoples[0]) {
      result[a + b + c] = 'A';
      if (dfs(a + 1, b, c, back_1, 0)) {
        return true;
      }
    }

    if (b + 1 <= peoples[1]) {
      result[a + b + c] = 'B';
      if (back_1 !== 1 && dfs(a, b + 1, c, back_1, 1)) {
        return true;
      }
    }

    if (c + 1 <= peoples[2]) {
      result[a + b + c] = 'C';
      if (back_1 !== 2 && back_2 !== 2 && dfs(a, b, c + 1, back_1, 2)) {
        return true;
      }
    }

    return false;
  }

  for (const people of S) {
    if (people === 'A') peoples[0]++;
    if (people === 'B') peoples[1]++;
    if (people === 'C') peoples[2]++;
  }
  
  const confirm = dfs(0, 0, 0, 0, 0);
  if (confirm) return result.join('');
  else return -1;
}

// -------------
// 출력
// -------------
const result = solution(input);
console.log(result);

// [접근]
// DFS(재귀) + 메모이제이션(DP) + 백트레킹

// 1. 백트레킹은 가능한 경우만 재귀문을 돌리는 것인데, 여기에서 return true, return false를 통해 그 역할을 수행한다.

// 2. 메모이제이션을 통해 각 근무자의 출근 순서를 기록해둔다.
// - 즉, 탐색을 하면서 이전에 방문한적이(탐색한적이) 있는 출근 순서인지를 기록해둔다.
// - true 이면 이미 탐색한 출근 순서, false 이면 미탐색 출근 기록
// - (DP에 기록되어 있는 출근 순서는 모두 유효한 출근 순서이다.)

// -> DP[사용한 A의 개수][사용한 B의 개수][사용한 C의 개수][마지막에서 2번째로 사용한 문자][마지막으로 사용한 문자]
