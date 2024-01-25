const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...ROOMS] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, rooms) {
  const visited = Array(n + 1).fill(0);
  const tree = Array.from({ length: n + 1 }, () => []);
  for (const [A, B, C] of rooms) {
    tree[A].push([B, C]);
    tree[B].push([A, C]);
  }

  const dfs = (room, sum) => {
    if (maxLen < sum) maxLen = sum;
    visited[room] = 1;
    for (const [next, len] of tree[room]) {
      if (visited[next]) continue;
      dfs(next, sum + len);
    }
  }

  let maxLen = 0;
  dfs(1, 0);

  return maxLen;
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, rooms) {
  const visited = Array(n + 1).fill(0);
  const tree = Array.from({ length: n + 1 }, () => []);
  for (const [A, B, C] of rooms) {
    tree[A].push([B, C]);
    tree[B].push([A, C]);
  }

  const bfs = (startRoom) => {
    visited[startRoom] = 1;
    const queue = [[startRoom, 0]];
    let maxLen = 0;

    while (queue.length) {
      const [room, sum] = queue.pop();
      maxLen = Math.max(maxLen, sum);

      for (const [next, len] of tree[room]) {
        if (visited[next]) continue;
        visited[next] = 1;
        queue.push([next, sum + len]);
      }
    }

    return maxLen;
  }

  return bfs(1);
}

// -------------
// 출력
// -------------
const result1 = solution1(N, ROOMS);
const result2 = solution2(N, ROOMS);
console.log(result1);
console.log(result2);

// [접근]

// ### 방법
// 요구사항은 입구에서 가장 거리가 먼 방까지의 거리를 구하는 문제이다.
// DFS 혹은 BFS를 통해 입구를 시작으로 각 방을 탐색하면서 거리를 더한다(누적합).
// 그리고 리프노드가 존재하는 방 까지 도달하면 더한 거리의 합이 최대값인지 구하면 된다.