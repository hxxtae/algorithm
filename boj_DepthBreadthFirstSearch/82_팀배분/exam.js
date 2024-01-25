const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...PEOPLES] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution1(n, peoples) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < n; i++) {
    graph[i + 1] = peoples[i].slice(1);
  }

  const ASC = (a, b) => a - b;
  
  const dfs = (node, kind) => {
    visited[node] = kind;
    for (const next of graph[node]) {
      if (visited[next]) continue;
      dfs(next, -kind);
    }
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    dfs(i, 1);
  }

  const [team1, team2] = visited.reduce((result, curr, idx) => {
    if (curr === 1) result[0].push(idx);
    if(curr === -1) result[1].push(idx);
    return result;
  }, [[], []]);

  console.log(team1.length);
  console.log(team1.sort(ASC).join(' '));
  console.log(team2.length);
  console.log(team2.sort(ASC).join(' '));
}

// -------------
// 풀이 (BFS)
// -------------
function solution2(n, peoples) {
  const visited = Array(n + 1).fill(0);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < n; i++) {
    graph[i + 1] = peoples[i].slice(1);
  }

  const ASC = (a, b) => a - b;

  const bfs = (initNode, kind) => {
    const queue = [[initNode, kind]];
    visited[initNode] = kind;

    while (queue.length) {
      const [node, color] = queue.shift();
      for (const next of graph[node]) {
        if (visited[next]) continue;
        visited[next] = -color;
        queue.push([next, -color]);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;
    bfs(i, 1);
  }

  const [team1, team2] = visited.reduce((result, curr, idx) => {
    if (curr === 1) result[0].push(idx);
    if(curr === -1) result[1].push(idx);
    return result;
  }, [[], []]);

  console.log(team1.length);
  console.log(team1.sort(ASC).join(' '));
  console.log(team2.length);
  console.log(team2.sort(ASC).join(' '));
}

// -------------
// 출력
// -------------
solution1(N, PEOPLES);
solution2(N, PEOPLES);

// [접근]

// ### 이분 그래프
// 이분 그래프는 정점의 색깔을 빨강, 파랑으로 색을 칠한다고 한다면
// 각 정점에서 인접한 두 정점이 다른 색으로 칠해질 수 있는 그래프를 의미한다.
// 즉, 각 정점이 인접한 정점과 다른 색을 가지고 있어야 한다.

// ### 정의
// - 정점에서 인접한 정점의 의미를 팀을 같이 하기 싫은 사람으로 정의할 수 있다.
// - 그래프는 각 정점에 인접한 정점을 같이 팀을 하기 싫은 사람들로 그래프를 정의한다.

// ### 번외
// 문제에서도 주어지듯이 무조건 두개의 팀으로 나눌 수 있다.
// 그러나 문제에서 이러한 제한 사항이 없다면 팀을 무조건 2개의 팀으로 나눌 수 없는 경우도 존재한다.
// - 1번이 3번, 5번과 팀을 하기 싫고
// - 3번이 1번, 5번과 팀을 하기 싫다면
// - 5번은 1번과 3번 그 어느 팀에도 속할 수 없기 때문에 2개의 팀으로 나눌 수 없다.

