const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N], ...TREE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, tree) {
  // 1. 트리의 root를 찾기
  let root = ((n * (n + 1)) / 2);
  for (let i = 0; i < n; i++) {
    const [node, left, right] = tree[i];
    root -= (left !== -1 ? left : 0);
    root -= (right !== -1 ? right : 0);
  }

  const graphOfLevel = Array(n + 1);
  const graph = Array.from({length: n + 1}, () => []);
  for (const [parent, ...child] of tree) {
    graph[parent].push(...child);
  }

  // 2. 트리 중위 탐색
  const dfs = (parent, deep, colNum) => {
    if (parent === -1) return colNum;

    const [left, right] = graph[parent];
    // 중위 탐색
    colNum = dfs(left, deep + 1, colNum);
    colNum += 1;
    graphOfLevel[parent] = [deep, colNum];
    colNum = dfs(right, deep + 1, colNum);

    return colNum;
  }

  dfs(root, 1, 0);

  // 3. 레벨별 가장 큰 너비의 "레벨과 너비" 구하기
  let maxWidth = 0;
  let maxLevel = 0;
  const levelLen = graphOfLevel.reduce((len, num) => (num ? Math.max(len, num[0]) : len), 0);
  const levelMinMax = Array.from({ length: levelLen + 1 }, () => [Infinity, 0]);
  for (let node = 1; node <= n; node++) {
    const [y, x] = graphOfLevel[node];
    const [min, max] = levelMinMax[y];
    levelMinMax[y][0] = Math.min(min, x);
    levelMinMax[y][1] = Math.max(max, x);

    const width = ((levelMinMax[y][1] - levelMinMax[y][0]) + 1);
    // 너비가 같은 경우
    if (maxWidth === width) {
      if (maxLevel > y) {
        maxLevel = y;
        maxWidth = width;
      }
    }
    // 너비가 더 큰 경우
    if (maxWidth < width) {
      maxLevel = y;
      maxWidth = width;
    }
  }
  return [maxLevel, maxWidth].join(' ');
}

// -------------
// 출력
// -------------
const result = solution(N, TREE);
console.log(result);

// [접근]
// 1. 해당 문제에서 루트(root) 노드를 지정해 주지 않았기 때문에 루트 노드를 먼저 구해야 한다.
//    - root를 구하는건 모든 노드들을 더한 값에서 트리에 존재하는 자식 노드들을 전부 빼주고 남는 값이 root가 된다.
// 2. 다음으로 각 노드들의 y,x 좌표를 구해야 한다.
//    - y: 노드의 깊이
//    - x: 노드의 중위탐색 시 방문 순서
//    - DFS 재귀 호출로 중위 탐색을 통해 각 노드들의 y,x 값을 구한다.
// 3. 각 노드들의 (y, x) 값을 탐색하면서, 레벨(y)별 x값의 최소값과 최대값을 구한다.
//    그리고 레벨별 너비가 가장 큰 레벨(y)과 너비를 반환하며, 너비가 같은 경우 가장 작은 레벨(y)과 너비를 반환한다.

// ※ 답이 루트노드가 되어야 하는 경우에는 너비가 1로 출력되어야 합니다. (노드 하나가 너비 1이기 때문에)