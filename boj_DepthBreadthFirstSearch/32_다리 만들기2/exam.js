const fs = require('fs');
const stdin = fs.readFileSync('./input_5.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...ISLAND] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, island) {
  // -1: 섬 / -2: 바다
  const islandClone = island.map(r => r.map(c => c === 0 ? -2 : -1));
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  let islandCnt = 0;

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  // 섬 구분 BFS
  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    islandClone[startY][startX] = islandCnt;
    while (queue.length) {
      const [y, x] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
          if (islandClone[nextY][nextX] === -1) {
            islandClone[nextY][nextX] = islandCnt;
            queue.push([nextY, nextX]);
          }
        }
      }
    }
  }
  // 섬과 섬 다리 연결 DFS
  const dfs = (y, x, this_land) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        // 육지(섬)
        if (islandClone[nextY][nextX] === this_land && !visited[nextY][nextX]) {
          visited[nextY][nextX] = 1;
          dfs(nextY, nextX, this_land);
        }
        // 바다
        if (islandClone[nextY][nextX] === -2) {
          let bridgeY = y, bridgeX = x;
          let bridge = 0;
          while (1) {
            bridgeY += (i === 1 ? 1 : i === 3 ? -1 : 0);
            bridgeX += (i === 0 ? 1 : i === 2 ? -1 : 0);
            if (bridgeY >= 0 && bridgeX >= 0 && bridgeY < n && bridgeX < m) {
              bridge += 1;
              if (islandClone[bridgeY][bridgeX] >= 0) {
                if (bridge <= 2) break;
                if (islandClone[bridgeY][bridgeX] === this_land) break;
                graph[this_land].push([islandClone[bridgeY][bridgeX], bridge - 1]);
                break;
              }
            } else break;
          }
        }
      }
    }
  }

  // Union-Find(get)
  const getParent = (x, parent) => {
    return parent[x] === x ? x : getParent(parent[x], parent);
  }

  // Union-Find(set)
  const setParent = (x, y, parent) => {
    const [a, b] = [getParent(x, parent), getParent(y, parent)];
    if (a > b) return parent[a] = b;
    return parent[b] = a;
  }

  // Union-Find(find)
  const findParent = (x, y, parent) => {
    const [a, b] = [getParent(x, parent), getParent(y, parent)];
    if (a === b) return true;
    return false;
  }
  
  // Main
  // 1. 섬 구분하기 (-1: 섬 -> 0 ~ x: 섬)
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (islandClone[r][c] === -1) {
        bfs(r, c);
        islandCnt++;
      }
    }
  }
  
  const graph = Array.from({ length: islandCnt }, () => []);
  const parent = Array.from({ length: islandCnt }, (_, i) => i);

  // 2. 섬이 존재하는 곳 찾아 다른 섬과 다리 연결하기
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (islandClone[r][c] >= 0 && !visited[r][c]) {
        visited[r][c] = 1;
        dfs(r, c, islandClone[r][c]);
      }
    }
  }

  // 3. 최소 신장 트리 구하기
  const graphNodes = graph.flatMap((arr, a) => arr.map(([b, diff]) => [a, b, diff]));
  graphNodes.sort((a, b) => a[2] - b[2]);
  let result = 0;

  for (const [a, b, diff] of graphNodes) {
    if (!findParent(a, b, parent)) {
      setParent(a, b, parent);
      result += diff;
    }
  }

  // 4. 모든 정점(섬)이 하나의 연결 그래프로 되어 있는지 확인
  for (let i = 0; i < islandCnt; i++) {
    parent[i] = getParent(i, parent)
  }

  const set = new Set(parent);
  return set.size === 1 ? result : -1;
}

// -------------
// 출력
// -------------
const result = solution(N, M, ISLAND);
console.log(result);

// [접근]
// 1. 각 좌표를 돌면서 섬이 있는 곳을 찾아 구분지어 놓는다.
// 2. DFS를 통해 섬을 탐색하면서 근접한 방향에 바다가 있는 곳이면, 해당 방향으로 다리를 만들어 나간다.
//    - 다리 끝에 섬이 있으면 두 섬을 잇는 다리의 길이를 기록한다.
//    - 다리 끝에 섬이 없으면 RollBack

// 3. (1), (2)를 반복하면서 섬과 섬사이의 다리를 모두 연결한 뒤
//    섬과 섬을 연결한 다리 길이 그래프를 다리 길이의 오름차순으로 정렬하여
//    모든 섬을 잇는 가장 적인 다리의 총 길이를 구한다.
//    - 최소 신장 트리 (크루스칼 알고리즘)를 구한다.

// 4. 마지막으로 모든 정점이 하나의 연결 그래프로 되어 있는지 확인

// -------

// ex) 위 1번 과정 결과
// [
//   [-2, -2, -2, -2, -2, -2,  0,  0],
//   [ 1,  1, -2, -2, -2, -2,  0,  0],
//   [ 1,  1, -2, -2, -2, -2, -2, -2],
//   [ 1,  1, -2, -2, -2,  2,  2, -2],
//   [-2, -2, -2, -2, -2,  2,  2, -2],
//   [-2, -2, -2, -2, -2, -2, -2, -2],
//   [ 3,  3,  3,  3,  3,  3,  3,  3]
// ]

// ※ 최소신장트리: 정점을 이은 간선의 값을 오름차순으로 정렬 이후
//    간선의 크기가 작은 것 부터 크루스칼 알고리즘을 통해 두 정점의 최소 간선을 parent배열에 기록해 나간다.
//    - 특징1: 중복된 두 정점이 존재하거나 사이클이 존재하여도 상관없다.
//    - 특징2: 최소신장트리의 값을 구했어도, 모든 정점이 하나의 연결 그래프로 되어있음을 보장하지는 않는다.