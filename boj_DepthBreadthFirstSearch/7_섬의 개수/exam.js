const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const inputNM = [], inputMap = [];
const inputLen = input.length;
let idx = 0;
while (1) {
  if (idx === inputLen - 1) break;
  const [w, h] = input[idx];
  inputNM.push([w, h]);
  idx += 1;
  inputMap.push([...input.slice(idx, idx + h)]);
  idx += h;
}

// -------------
// 풀이 (DFS)
// -------------
function solution1(w, h, mapArr) {
  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];
    return [y + Y[way], x + X[way]];
  }
  const dfs = (nowY, nowX) => {
    for (let i = 0; i < 8; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < h && nextX < w) {
        if (mapArr[nextY][nextX]) {
          mapArr[nextY][nextX] = 0;
          dfs(nextY, nextX);
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (mapArr[r][c]) {
        mapArr[r][c] = 0;
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(w, h, mapArr) {
  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    mapArr[startY][startX] = 0;

    while (queue.length) {
      const [nowY, nowX] = queue.shift();
      for (let i = 0; i < 8; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < h && nextX < w) {
          if (mapArr[nextY][nextX]) {
            mapArr[nextY][nextX] = 0;
            queue.push([nextY, nextX]);
          }
        }
      }
    }
  }

  let count = 0;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (mapArr[r][c]) {
        bfs(r, c);
        count++;
      }
    }
  }
  return count;
}

// -------------
// 출력
// -------------
const result1 = [];
const result2 = [];
inputNM.forEach(([W, H], idx) => {
  const cnt1 = solution1(W, H, inputMap[idx].map(arr => [...arr]));
  const cnt2 = solution2(W, H, inputMap[idx].map(arr => [...arr]));
  result1.push(cnt1);
  result2.push(cnt2);
});
console.log(result1.join('\n'))
console.log('---')
console.log(result2.join('\n'))
