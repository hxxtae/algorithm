const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...FOREST] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, forest) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  let maxCount = 0;
  
  const dfs = (y, x, count) => {
    let max = count;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        if (forest[nextY][nextX] > forest[y][x]) { // 다음 곳이 이전보다 대나무가 더 많은 경우
          // DP가 아직 없는 경우
          if (!visited[nextY][nextX]) {
            const maxCnt = dfs(nextY, nextX, count + 1);
            max = Math.max(max, maxCnt);
            // DP가 존재하는 경우
          } else { 
            max = Math.max(max, count + visited[nextY][nextX]);
          }
        }
      }
    }
    visited[y][x] = max - count + 1; // DP[y][x] = 해당 시작점의 최대 이동 카운트
    return max;
  }
  
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!visited[r][c]) {
        visited[r][c] = 1;
        const count = dfs(r, c, 1);
        visited[r][c] = count; // DP[r][c] = 해당 시작점의 최대 이동 카운트
        maxCount = Math.max(maxCount, count);
      }
    }
  }
  return maxCount;
}


// -------------
// 출력
// -------------
const result = solution(N, FOREST);
console.log(result)

// [접근]
// 각각의 인덱스(노드)는 판다를 풀어놓는 시작점이며, 해당 시작점을 시작으로 얼마나 많이 판다가 이동할 수 있는지를
// DP로 나타낼 수 있다.
// ⭐DP[y][x] = 해당 좌표를 시작으로 하였을 때 판다의 최대 이동 수

// [코드 설명]
// visited[y][x] = max - count + 1;

// DP[y][x] = 해당 시작점의 최대값으로(시작점인 경우 판다의 이동 카운트 최대값)
// `count` 는 판다가 다음 좌표(현재 좌표)까지 이동한 거리를 의미한다.
// `1`은 해당 좌표를 의미한다.
// 즉, DP[y][x] 는 현재 시작점의 최대 이동 카운트를 의미한다.