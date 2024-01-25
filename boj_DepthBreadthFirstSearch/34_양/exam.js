const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [[R, C], YARD] = [input[0].split(' ').map(Number), input.slice(1)];

// -------------
// 풀이 (DFS)
// -------------
function solution1(r, c, yard) {
  const visited = Array.from({ length: r }, () => Array(c).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x) => {
    yard[y][x] === 'o' && sheepCount++;
    yard[y][x] === 'v' && wolfCount++;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
        if (yard[nextY][nextX] !== '#' && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX);
        }
      }
    }
  }

  const result = [0, 0]; // [total_sheep_count, total_wolf_count]
  let sheepCount = 0, wolfCount = 0;
  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      if (yard[row][col] !== '#' && !visited[row][col]) {
        visited[row][col] = 1;
        dfs(row, col);

        if (sheepCount > wolfCount) result[0] += sheepCount;
        else result[1] += wolfCount;
        sheepCount = 0;
        wolfCount = 0;
      }
    }
  }
  return result.join(' ')
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(r, c, yard) {
  const visited = Array.from({ length: r }, () => Array(c).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    let sheep = 0, wolf = 0;
    while (queue.length) {
      const [y, x] = queue.shift();
      yard[y][x] === 'v' && wolf++;
      yard[y][x] === 'o' && sheep++;

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
          if (yard[nextY][nextX] !== '#' && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
          }
        }
      }
    }
    if (sheep > wolf) wolf = 0;
    else sheep = 0;
    return [sheep, wolf];
  }

  const answer = [0, 0]; // [total_sheep_count, total_wolf_count]
  for (let row = 0; row < r; row++) {
    for (let col = 0; col < c; col++) {
      if (yard[row][col] !== '#' && !visited[row][col]) {
        const [sheepCnt, wolfCnt] = bfs(row, col);
        answer[0] += sheepCnt;
        answer[1] += wolfCnt;
      }
    }
  }
  return answer.join(' ');
}

// -------------
// 출력
// -------------
const result1 = solution1(R, C, YARD);
const result2 = solution2(R, C, YARD);
console.log(result1);
console.log(result2);
