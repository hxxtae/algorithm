const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...MAP] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, mapArr) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));
  const maxHeight = mapArr.reduce((result, arr) => Math.max(result, ...arr), 0);
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (nowY, nowX, deep) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        if (mapArr[nextY][nextX] > deep && visited[nextY][nextX] !== deep) {
          visited[nextY][nextX]++;
          dfs(nextY, nextX, deep);
        }
      }
    }
  }

  let maxSection = 1;
  for (let rain = 1; rain < maxHeight; rain++) {
    let count = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (mapArr[r][c] > rain && visited[r][c] !== rain) {
          visited[r][c]++;
          dfs(r, c, rain);
          count++;
        }
      }
    }
    maxSection = Math.max(maxSection, count);
  }
  return maxSection;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, mapArr) {
  const visited = Array.from({ length: n }, () => Array(n).fill(0));
  const maxHeight = mapArr.reduce((result, arr) => Math.max(result, ...arr), 0);
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, deep) => {
    const queue = [[startY, startX]];
    visited[startY][startX]++;

    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
          if (mapArr[nextY][nextX] > deep && visited[nextY][nextX] !== deep) {
            queue.push([nextY, nextX]);
            visited[nextY][nextX]++;
          }
        }
      }
    }
  }

  let maxSection = 1;
  for (let rain = 1; rain < maxHeight; rain++) {
    let count = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (mapArr[r][c] > rain && visited[r][c] !== rain) {
          count++;
          bfs(r, c, rain);
        }
      }
    }
    maxSection = Math.max(maxSection, count);
  }
  return maxSection;
}

// -------------
// 출력
// -------------
const result1 = solution1(N, MAP);
const result2 = solution2(N, MAP);
console.log(result1);
console.log(result2);

// NOTE: [ 다른 visited 접근 방법 ]
// 매번 반복마다 새로운 `vidited` 이중 배열을 생성한다면 리소스 낭비가 크다.
// 기존 0, 1 를 통한 visited 방식이 아니라, DP의 메모이제이션을 통한 방법으로,
// 점점 높아지는 비의 잠김 정도(rain)를 맞춰 가면서 같으면 방문한 적이 있으며 다르면 아직 방문한 적이 없음으로
// visited의 방문 여부를 판단한다.