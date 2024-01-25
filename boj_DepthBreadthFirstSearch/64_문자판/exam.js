const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n');

// -------------
// 풀이 (DFS)
// -------------
function solution(input) {
  const [N, M, K] = input[0].split(' ').map(Number);
  const board = input.slice(1, N + 1);
  const word = [...input[input.length - 1]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () =>
      Array(word.length).fill(-1)));

  const findWay = (y, x, way, num) => {
    const X = [num, 0, -num, 0];
    const Y = [0, num, 0, -num];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, idx) => {
    if (idx === (word.length - 1)) {
      return 1;
    }
    if (visited[y][x][idx] !== -1) {
      return visited[y][x][idx];
    }

    visited[y][x][idx] = 0;

    for (let i = 0; i < 4; i++) {
      for (let go = 1; go <= K; go++) {
        const [nextY, nextX] = findWay(y, x, i, go);
        if (nextY >= 0 && nextX >= 0 && nextY < N && nextX < M) {
          if (board[nextY][nextX] === word[idx + 1]) {
            visited[y][x][idx] += dfs(nextY, nextX, idx + 1);
          }
        }
      }
    }

    return visited[y][x][idx];
  }

  let count = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] === word[0]) {
        count += dfs(r, c, 0);
      }
    }
  }

  return count;
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);

// [접근]
// ✨ visited(DP)의 정의
// -> visited[y][x][idx]는 해당 좌표(y, x)에서 word의 단어 순서(idx)를 의미하며,
//    visited[y][x][idx]에 할당되는 값은 해당 좌표(y, x)에서 해당 단어 순서(idx)를 탐색할 시
//    완성될 수 있는 단어의 결과 개수를 메모이제이션 한 값이다.

// ✨ visited(DP)를 -1로 초기화 하는 이유
// -> 양의 정수(0을 포함한 모든 자연수)의 값을 메모이제이션 하기 때문이다.
//    즉, 어떤 좌표의 값이 1 이라면 1로 메모이제이션 된 것이며, 0 이라면 0으로 메모이제이션 된 것이다.

// [유사 문제]
// 해당 문제는 "13_내리막 길" 문제와 유사하다.
// 해당 문제는 "65_미로 탈출하기" 문제와 유사하다.
