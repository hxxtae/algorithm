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
  const [N, M] = input[0].split(' ').map(Number);
  const MASE = input.slice(1);
  const visited = Array.from({ length: N }, () => Array(M).fill(-1)); // DP
  
  const findWay = (y, x, way) => {
    const wayMap = { U: 3, D: 1, L: 2, R: 0 };
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[wayMap[way]], x + X[wayMap[way]]];
  }

  const dfs = (y, x) => {
    // 메모이제이션: 이미 갔던 미로의 위치인 경우
    if (visited[y][x] !== -1) {
      return visited[y][x];
    }

    visited[y][x] = 0;

    const [nextY, nextX] = findWay(y, x, MASE[y][x]);
    // A: 다음 위치가 미로를 탈출하지 못할 때
    if (nextY >= 0 && nextX >= 0 && nextY < N && nextX < M) {
      return visited[y][x] = dfs(nextY, nextX);
    }
    // B: 다음 위치가 미로를 탈출할 때
    return visited[y][x] = 1;
  }

  let count = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      count += dfs(r, c);
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
// DP를 활용한 문제로 미로를 탐색하면서 새롭게 탐색한 미로와 이전에 갔던 미로를 DP를 확인하여 탐색을 이어간다.
// 즉, 미로의 탈출 여부를 메모이제이션하고 활용하여 미로를 탐색한다.

// ✨ visited(DP)의 정의
// -> visited[y][x]는 이미 탐색한 해당 좌표에서 미로의 탈출 가능 여부를 의미한다.
//    visited[y][x]에 할당되는 값이 1이면 탈출가능, 0이면 탈출 불가, -1은 아직 탐색하지 못한 미로이다.

// ✨ visited(DP)를 -1로 초기화 하는 이유
// -> 0과 1의 값을 메모이제이션 하기 때문이다. 그렇기 때문에 아직 메모이제이션 되지 않은 값을 -1로 초기화해 놓는다.

// [유사 문제]
// 해당 문제는 "64_문자판" 문제와 유사하다.