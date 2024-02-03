const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [N, ...ICE_CREAM] = input;

// -------------
// 풀이
// - DFS: 런타임 에러(StackSizeExceeded)
// - BFS: 성공
// -------------
function solution(n, iceCream) {
  const visited = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, areaCnt, roundCnt) => {
    visited[y][x] = 1;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) {
        roundCnt += 1;
        continue;
      }
      if (iceCream[nextY][nextX] !== '#') {
        roundCnt += 1;
        continue;
      }
      if (visited[nextY][nextX]) continue;
      [areaCnt, roundCnt] = dfs(nextY, nextX, areaCnt + 1, roundCnt);
    }

    return [areaCnt, roundCnt];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    let areaCnt = 1;
    let roundCnt = 0;
    visited[startY][startX] = 1;
    
    while (queue.length) {
      const [y, x] = queue.pop();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) {
          roundCnt += 1;
          continue;
        }
        if (iceCream[nextY][nextX] !== '#') {
          roundCnt += 1;
          continue;
        }
        if (visited[nextY][nextX]) continue;
        visited[nextY][nextX] = 1;
        areaCnt += 1;
        queue.push([nextY, nextX]);
      }
    }

    return [areaCnt, roundCnt];
  }

  let maxArea = 0;
  let minRound = Infinity;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (visited[r][c]) continue;
      if (iceCream[r][c] !== '#') continue;
      // const [area, round] = dfs(r, c, 1, 0);
      const [area, round] = bfs(r, c);
      if (maxArea < area) {
        maxArea = area;
        minRound = round;
        continue;
      }
      if (maxArea === area && minRound > round) {
        minRound = round;
      }
    }
  }

  return [maxArea, minRound].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(+N, ICE_CREAM);
console.log(result);

// [접근]
// ### 요약
// 면적이 가장 큰 덩어리를 구해야 한다. (동일 면적 대비 둘레가 가장 작은 것을 선택)

// ### 방법
// 모든 노드를 DFS 혹은 BFS로 탐색을 수행하면서 동, 서, 남, 북 방향으로 좌표를 탐색한다.
// 얼음(#)이 존재하는 곳에서 부터 동, 서, 남, 북 방향으로 인접한 얼음(#)이 존재하는 곳을 탐색한다.
// - 면적의 개수: 좌표를 탐색하면서 '#' 가 존재하는 개수를 카운트 한다.
// - 둘레의 개수: 좌표를 탐색하면서 '#' 가 아닌 '.' 또는 범위 밖의 좌표를 탐색한 경우를 카운트 한다.
