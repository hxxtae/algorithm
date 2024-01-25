const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], BRIDGE, [S]] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, bridge, s) {
  const visited = Array(n).fill(0);

  const findWay = (x, way, num) => {
    const X = [num, -num];

    return x + X[way];
  }

  const dfs = (x) => {
    for (let i = 0; i < 2; i++) {
      const nextX = findWay(x, i, bridge[x]);
      if (nextX < 0 || nextX >= n) continue;
      if (visited[nextX]) continue;
      visited[nextX] = 1;
      cnt += 1;
      dfs(nextX);
    }
  }

  let cnt = 1;
  visited[s - 1] = 1;
  dfs(s - 1);

  return cnt;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, bridge, s) {
  const visited = Array(n).fill(0);

  const findWay = (x, way, num) => {
    const X = [num, -num];

    return x + X[way];
  }

  const bfs = (startX) => {
    const queue = [startX];
    visited[startX] = 1;

    let cnt = 1;
    while (queue.length) {
      const x = queue.pop();
      for (let i = 0; i < 2; i++) {
        const nextX = findWay(x, i, bridge[x]);
        if (nextX < 0 || nextX >= n) continue;
        if (visited[nextX]) continue;
        visited[nextX] = 1;
        cnt += 1;
        queue.push(nextX);
      }
    }

    return cnt;
  }

  return bfs(s - 1);
}

// -------------
// 출력
// -------------
const result1 = solution1(N, BRIDGE, S);
const result2 = solution2(N, BRIDGE, S);
console.log(result1);
console.log(result2);