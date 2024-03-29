const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...FIELD] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution1(m, n, field) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, team) => {
    team === "W" && w_team_power++;
    team === "B" && b_team_power++;
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
        if (!visited[nextY][nextX] && field[nextY][nextX] === team) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX, team);
        }
      }
    }
  }

  const result = [0, 0]; // [total_w_team_power, total_b_team_power]
  let w_team_power = 0,
      b_team_power = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (!visited[r][c]) {
        visited[r][c] = 1;
        dfs(r, c, field[r][c]);
        result[0] += (w_team_power ** 2);
        result[1] += (b_team_power ** 2);
        w_team_power = 0;
        b_team_power = 0;
      }
    }
  }
  return result.join(' ');
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(m, n, field) {
  const visited = Array.from({ length: m }, () => Array(n).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX, kind) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;

    let cnt = 1;
    while (queue.length) {
      const [y, x] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < m && nextX < n) {
          if (field[nextY][nextX] === kind && !visited[nextY][nextX]) {
            visited[nextY][nextX] = 1;
            queue.push([nextY, nextX]);
            cnt++;
          }
        }
      }
    }
    return cnt;
  }

  const result = [0, 0];  // [total_w_team_power, total_b_team_power]
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (!visited[r][c]) {
        visited[r][c] = 1;
        const count = bfs(r, c, field[r][c]);
        field[r][c] === 'W' && (result[0] += (count ** 2));
        field[r][c] === 'B' && (result[1] += (count ** 2));
      }
    }
  }
  return result.join(' ');
}

// -------------
// 출력
// -------------
const result1 = solution1(M, N, FIELD);
const result2 = solution2(M, N, FIELD);
console.log(result1);
console.log(result2);

