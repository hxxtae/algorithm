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
  let arrKey = 1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === "1" && visited[r][c] === -1) {
        // 1-1. DFS
        // visited[r][c] = [arrKey];
        // const count = dfs(r, c, 1, visited[r][c]);

        // 1-1. BFS
        bfs(r, c, [arrKey]);
        arrKey += 1;
      }
    }
  }

  // 2-1.
  const onShapeCount = (y, x, cnt) => {
    const oneList = []; // new Set으로 바꾸어도 좋을듯 하다.
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
// 문제에서 요구하는 바는 1로 변을 인접하고 있는 경우 연결이 가능하며 연결된 1의 개수를 모양의 크기라고 한다.
// 그런데 배열에서 칸 하나에 들어있는 수를 변경해서 만들 수 있는 최대 크기를 구해야 한다.
// 즉, 연결된 1의 모양에서 주변에 인접한 0 하나만 1로 바꾸어 연결하였을 경우 최대가 되는 모양의 크기를 구하면 된다.

// 1. 먼저 1로 연결된 모양의 크기를 구한다. 모양은 구분지어 놓는다.

// - 탐색을 통해 연결된 1을 카운트 하여 모양을 찾는다.
// - visited의 값 : [모양구분key, 모양크기count]

// 2. 배열에서 0인 경우를 탐색하여 인접한 곳에 모양을 가진 경우가 존재하면 모양의 크기를 더해준다.

// - 0을 1로 바꾸면 크기 (1) + 인접한 모양의 크기 (0 ~ ?)
// - 최대 모양의 크기를 반환

// ### 메모
// 문제의 접근과 유형 모두 "38_벽 부수고 이동하기4" 문제와 아주 비슷하다.