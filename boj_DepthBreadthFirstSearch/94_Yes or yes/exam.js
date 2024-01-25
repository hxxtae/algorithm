const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [S_LIST, [S]] = [input.pop(), input.pop()];
const [[N, M], ...CONN] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, conn, s, s_list) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of conn) {
    graph[u].push(v);
  }
  for (const fan of s_list) {
    visited[fan] = 1;
  }
  
  const dfs = (node) => {
    if (visited[node]) return false;
    if (graph[node].length === 0) return true;

    for (const next of graph[node]) {
      const met = dfs(next);
      if (met) return true;
    }

    return false;
  }

  const start = 1;
  const result = dfs(start);

  return result ? 'yes' : 'Yes';
}

// -------------
// 출력
// -------------
const result = solution(N, M, CONN, S, S_LIST);
console.log(result);

// [접근]
// ### 방법
// 투어리스트 곰곰이가 팬클럽 곰곰이를 만나지 않는 경로를 찾을 때 까지 탐색한다.
// 즉, 투어리스트 곰곰이가 팬클럽 곰곰이를 만나지 않는 경로를 찾으면 함수를 종료하고 'yes'를 출력한다.
// 투어리스트 곰곰이가 팬클럽 곰곰이를 한 번 이라도 만나지 않는 경로가 존재하지 않으면 'Yes'를 출력한다.

// visited에 팬클럼 곰곰이의 위치를 지정해 놓고, 경로를 탐색하면서 visited에 팬클럽 곰곰이가 있으면,
// 해당 경로는 팬클럽 곰곰이를 만날 수 밖에 없는 경로이기 때문에 다음 탐색을 하지 않고 다른 경로의 탐색을 이어간다.