const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [RCK, ...ROAD] = input;
const [R, C, K] = RCK.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution(r, c, k, road) {
  const visited = Array.from({ length: r }, () => Array(c).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, cnt) => {
    // 도착 지점: (Y: 0, X: c - 1)
    if ((y === 0) && (x === (c - 1)) && (cnt === k)) {
      count++;
      return;
    }
  
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
        if (road[nextY][nextX] !== 'T' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX, cnt + 1);
          visited[nextY][nextX] = 0;
        }
      }
    }
  }

  let count = 0;
  visited[r - 1][0] = 1;
  dfs(r - 1, 0, 1); // 출발 지점: (Y: r - 1, X: 0)

  return count;
}

// -------------
// 출력
// -------------
const result = solution(R, C, K, ROAD);
console.log(result);
