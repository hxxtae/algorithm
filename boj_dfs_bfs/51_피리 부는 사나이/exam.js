const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...MAPS] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, maps) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = { L: -1, R: 1, U: 0, D: 0 };
    const Y = { L: 0, R: 0, U: -1, D: 1 };

    return [y + Y[way], x + X[way]];
  }

  // - "false"는 탐색 중에 탐색한 모든 지점이 새롭게 방문헸거나, 현재 탐색 중인 방문인 경우 -> yes 카운트
  // - "true"는 탐색 중에 이미 이전 탐색에서 방문한 지점을 다시 방문한 경우 -> no 카운트
  const dfs = (y, x, flow, way) => {
    const [nextY, nextX] = findWay(y, x, way);
    if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
      if (!visited[nextY][nextX]) {
        visited[nextY][nextX] = flow;
        const noCount = dfs(nextY, nextX, flow, maps[nextY][nextX]);
        if (noCount) return true;
      }
      else if (visited[nextY][nextX] !== flow) return true;
      else if (visited[nextY][nextX] === flow) return false;
    }

    return false;
  }

  let count = 0, flow = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!visited[r][c]) {
        flow += 1;
        visited[r][c] = flow;
        const noCount = dfs(r, c, flow, maps[r][c]);
        if (noCount) continue;
        count += 1;
      }
    }
  }

  return count;
}

// -------------
// 출력
// -------------
const result = solution(N, M, MAPS);
console.log(result);

// [접근]
// safe zone 설치 시, 방향에 따라 탐색한 지점이 결론적으로 하나의 흐름을 가질 때, 하나의 safe zone을 가지면 된다.
// 즉, 새로운 흐름(길)은 safe zone을 설치 (카운트 +1), 이전에 같은 흐름(길)을 찾은 경우 safe zone 노 설치 (카운트 무시)

// 정리하자면
// - 새로운 흐름(길) : 탐색 중에 탐색한 모든 지점이 새롭게 방문헸거나, 현재 탐색 중인 방문인 경우 -> yes 카운트
// - 중복된 흐름(길) : 탐색 중에 이미 이전 탐색에서 방문한 지점을 다시 방문한 경우 -> no 카운트