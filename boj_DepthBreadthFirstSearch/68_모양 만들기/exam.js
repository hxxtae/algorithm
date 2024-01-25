const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const [N, M] = input[0].map(Number);
const MATRIX = input.slice(1);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, matrix) {
  const visited = Array.from({ length: n }, () => Array(m).fill(-1));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  // 1-1. DFS (제출 시 "StackSizeExceeded" 에러 발생 -> 100만건 데이터 재귀탐색 시 발생)
  const dfs = (y, x, cnt, arr) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
      if (matrix[nextY][nextX] !== "1" || visited[nextY][nextX] !== -1) continue;
      visited[nextY][nextX] = arr;
      cnt = dfs(nextY, nextX, cnt + 1, arr);
    }

    return cnt;
  }

  // 1-1. BFS (그래서 DFS 방식 말고 BFS 방식으로 선택 -> 통과)
  const bfs = (startY, startX, arr) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = arr;

    let cnt = 1;
    while (queue.length) {
      const [y, x] = queue.pop();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
        if (matrix[nextY][nextX] !== "1" || visited[nextY][nextX] !== -1) continue;
        visited[nextY][nextX] = arr;
        queue.push([nextY, nextX]);
        cnt += 1;
      }
    }

    arr.push(cnt);
    return cnt;
  }

  // 1.
  let oneOfKey = 1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === "1" && visited[r][c] === -1) {
        // 1-1. DFS
        // visited[r][c] = [oneOfKey];
        // const count = dfs(r, c, 1, visited[r][c]);

        // 1-1. BFS
        bfs(r, c, [oneOfKey]);
        oneOfKey += 1;
      }
    }
  }

  // 2-1.
  const onShapeCount = (y, x, cnt) => {
    const oneList = [];
    for (let i = 0; i < 4; i++) {
      const [aroundY, aroundX] = findWay(y, x, i);
      if (aroundY < 0 || aroundX < 0 || aroundY >= n || aroundX >= m) continue;
      if (matrix[aroundY][aroundX] === "0") continue;
      const [key, oneCnt] = visited[aroundY][aroundX];
      if (oneList.includes(key)) continue;

      cnt += oneCnt;
      oneList.push(key);
    }

    return cnt;
  }

  // 2.
  let max = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === "0") {
        const count = onShapeCount(r, c, 1);
        max = Math.max(max, count);
      }
    }
  }

  return max;
}

// -------------
// 출력
// -------------
const result = solution(N, M, MATRIX);
console.log(result);

// [접근]
// 문제의 접근과 유형 모두 "38_벽 부수고 이동하기4" 문제와 아주 비슷하다.