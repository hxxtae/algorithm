const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...SEA] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, m, sea) {
  // visited Year (빙산 변화 년도)
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (nowY, nowX, year) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (visited[nextY][nextX] !== year) {
          
          if (sea[nextY][nextX]) {
            visited[nextY][nextX] = year;
            dfs(nextY, nextX, year);
          } else {
            !sea[nowY][nowX] || sea[nowY][nowX]--;
          }

        }
      }
    }
  }

  
  let count = 0;
  let year = 0;
  while (count < 2) {
    count = 0;
    year++;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (sea[r][c] && visited[r][c] !== year) {
          count++;
          visited[r][c] = year;
          dfs(r, c, year);
        }
      }
    }
    if (count === 0) break;
  }
  return count > 1 ? year-1 : 0;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, m, sea) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, year) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = year;

    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (visited[nextY][nextX] !== year) {

            if (sea[nextY][nextX]) {
              queue.push([nextY, nextX]);
              visited[nextY][nextX] = year;
            } else {
              !sea[nowY][nowX] || sea[nowY][nowX]--;
            }

          }
        }
      }
    }
  }

  let year = 0;
  let count = 0;
  while (count < 2) {
    count = 0;
    year++;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (sea[r][c] && visited[r][c] !== year) {
          count++;
          bfs(r, c, year);
        }
      }
    }
    if(count === 0) break;
  }

  return count > 1 ? year - 1 : 0;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, M, SEA.map(arr => arr.map(num => num)));
const result2 = solution2(N, M, SEA.map(arr => arr.map(num => num)));
console.log(result1);
console.log(result2);

// [접근]
// visited, 빙산이 녹는 년도를 visited에 기록한다.
// 현재 1년째에 빙산이 녹는 경우를 탐색하기 위해 DFS를 수행하면서 visited에 1-year을 기록한다.
// 다음 2년째에 빙산이 녹는 경우를 탐색하기 위해 DFS를 수행하면서 visited에 2-year을 기록한다.

// 이렇게 visited를 true/false , 1/0 이 아닌 년도별로 방문 여부를 체크하면
// 해당 년도에 (A)빙산이 녹아 바다가 된 경우 (A)빙산으로 인해 인접한 (B)빙산이 녹는 조건의 바다로 포함되지 않게 하기 위해
// visited를 년도로 체크한다.

// -------------

// 1년 이후 빙산
// [
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 2, 4, 1, 0, 0],
//   [0, 1, 0, 1, 5, 0, 0],
//   [0, 5, 4, 1, 2, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0]
// ]

// 2년 이후 빙산
// [
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 3, 0, 0, 0],
//   [0, 0, 0, 0, 4, 0, 0],
//   [0, 3, 2, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0]
// ]
