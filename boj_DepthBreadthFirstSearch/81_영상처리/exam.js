const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));
const T = +input.pop();
const [[N, M], ...IMAGE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, image) {
  const matrix = Array.from({ length: n }, () => []);
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const onFilterImage = () => {
    const RGB_LEN = 3;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < image[r].length; c += RGB_LEN) {
        const sum = image[r].slice(c, c + RGB_LEN).reduce((sum, curr) => sum + +curr, 0);
        const avg = Math.floor(sum / RGB_LEN);
        if (avg >= T) matrix[r].push(255);
        else matrix[r].push(0);
      }
    }
  }

  const dfs = (y, x) => {
    visited[y][x] = 1;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
      if (!matrix[nextY][nextX]) continue;
      if (visited[nextY][nextX]) continue;
      dfs(nextY, nextX);
    }
  }

  onFilterImage();

  let count = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!matrix[r][c]) continue;
      if (visited[r][c]) continue;
      dfs(r, c);
      count += 1;
    }
  }

  return count;
}

// -------------
// 출력
// -------------
const result = solution(+N, +M, IMAGE);
console.log(result);
