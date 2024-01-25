const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item) => item.trim());
const [N, MAP] = [+input[0], input.slice(1).map(r => r.split('').map(Number))];

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, map) {
  const result = [];
  let count = 1;
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  const dfs = (nowY, nowX) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
        if (map[nextY][nextX]) {
          map[nextY][nextX] = 0;
          count++;
          dfs(nextY, nextX);
        }
      }
    }
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!map[r][c]) continue;
      map[r][c] = 0;
      dfs(r, c);
      result.push(count);
      count = 1;
    }
  }
  return [result.length, result.sort((a, b) => a - b).join('\n')];
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, map) {
  const result = [];
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }
  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    let count = 1;
    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < n) {
          if (map[nextY][nextX]) {
            map[nextY][nextX] = 0;
            queue.push([nextY, nextX]);
            count++;
          }
        }
      }
    }
    return count;
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!map[r][c]) continue;
      map[r][c] = 0;
      const count = bfs(r, c);
      result.push(count);
    }
  }
  return [result.length, result.sort((a, b) => a - b).join('\n')];
}


// -------------
// 출력
// -------------
const [len1, countStr1] = solution1(N, MAP.map((arr) => [...arr]));
console.log(len1);
console.log(countStr1);
console.log('------')
const [len2, countStr2] = solution2(N, MAP);
console.log(len2);
console.log(countStr2);
