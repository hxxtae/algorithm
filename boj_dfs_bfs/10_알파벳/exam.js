const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map((item, idx) => idx === 0 ? item.trim().split(' ') : item.trim());
const [[R, C], ...BOARD] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(r, c, board) {
  const visited = Array.from({ length: r }, () => Array(c).fill(0));
  const visitedObj = {};
  for (let i = 0; i < 26; i++) {
    visitedObj[String.fromCharCode(i + 65)] = 0;
  }
  
  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (nowY, nowX, count) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(nowY, nowX, i);
      if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
        if (!visited[nextY][nextX] && !visitedObj[board[nextY][nextX]]) {
          visited[nextY][nextX] = 1;
          visitedObj[board[nextY][nextX]] = 1;
          dfs(nextY, nextX, count + 1);
          visited[nextY][nextX] = 0;
          visitedObj[board[nextY][nextX]] = 0;
        }
      }
    }
    // 벡트레킹
    result = Math.max(result, count);
  }

  let result = 1;
  visited[0][0] = 1;
  visitedObj[board[0][0]] = 1;
  dfs(0, 0, result);
  return result;
}

// -------------
// 풀이 (BFS) -> BFS로는 문제에서 원하는 답을 구하지 못한다.
// -------------
function solution2(r, c, board) {
  const visited = {};
  for (let i = 0; i < 26; i++) {
    visited[String.fromCharCode(i + 65)] = 0;
  }

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const bfs = () => {
    let result = 1;
    const queue = [[0, 0, result]];
    visited[board[0][0]] = 1;

    while (queue.length) {
      const [nowY, nowX, count] = queue.shift();
      result = Math.max(result, count);

      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(nowY, nowX, i);
        if (nextY >= 0 && nextX >= 0 && nextY < r && nextX < c) {
          if (!visited[board[nextY][nextX]]) {
            visited[board[nextY][nextX]] = 1;
            queue.push([nextY, nextX, count+1]);
          }
        }
      }
    }
    return result;
  }
  return bfs();
}

// -------------
// 출력
// -------------
const result1 = solution1(R, C, BOARD);
const result2 = solution2(R, C, BOARD);
console.log(result1);
console.log(result2);

// [접근]
// DFS를 통해 Board를 탐색하면서 이전에 탐색한 알파벳의 경우 방문 여부를 기록해 주어야 한다.
// visitedObj를 객체나 Hash Map을 통해 해당 알파벳(key)에 대한 방문 여부(value)를 기록해 주면서
// 깊이 우선 탐색을 수행하도록 한다.
// 동시에 visited 배열을 통해 이전에 방문한 노드를 다시 방문하지 않도록 한다.

// ※ 해시 객체의 경우 리터럴 객체보다 느린 자료구조이기 때문에 BOJ에서 시간 초과가 발생한다.