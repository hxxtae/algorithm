const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const [[N], ...ROAD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, road) {
  const findWay = (y, x, way) => {
    const X = [1, 0];
    const Y = [0, 1];

    return [y + Y[way], x + X[way]];
  }

  const findOp = (a, b, op) => {
    if (op === '+') return +a + +b;
    if (op === '-') return +a - +b;
    return +a * +b;
  }

  const dfs = (y, x, result, op) => {
    if ((y === n - 1) && (x === n - 1)) {
      max = Math.max(max, result);
      min = Math.min(min, result);
      return;
    }
    for (let i = 0; i < 2; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= n) continue;
      const num = +road[nextY][nextX];
      if (Number.isNaN(num)) {
        const newOp = road[nextY][nextX];
        dfs(nextY, nextX, result, newOp);
      } else {
        const newResult = findOp(result, num, op);
        dfs(nextY, nextX, newResult, op);
      }
    }
  }

  let max = -Infinity;
  let min = Infinity;
  dfs(0, 0, road[0][0], '');
  
  return [max, min].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, ROAD);
console.log(result);