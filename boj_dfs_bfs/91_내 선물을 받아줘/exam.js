const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const [NM, ...MATRIX] = input;
const [N, M] = NM.split(' ').map(Number);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, matrix) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));
  
  const findWay = (y, x, strWay) => {
    const wayObj = { E: 0, S: 1, W: 2, N: 3 };
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[wayObj[strWay]], x + X[wayObj[strWay]]];
  }

  // DFS의 반환값에 따른 그래프 판단
  // - false: 같은 연결리스트 그래프
  // - true: 다른 연결리스트 그래프
  const dfs = (y, x, num) => {
    visited[y][x] = num;
    const [nextY, nextX] = findWay(y, x, matrix[y][x]);
    if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) return true;
    if (visited[nextY][nextX] && visited[nextY][nextX] === num) return true;
    if (visited[nextY][nextX] && visited[nextY][nextX] !== num) return false;
    return dfs(nextY, nextX, num);
  }

  let graphCnt = 0;
  let visitNum = 1;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (visited[r][c]) continue;
      const kind = dfs(r, c, visitNum);
      if (kind) graphCnt += 1;
      visitNum += 1;
    }
  }

  return graphCnt;
}

// -------------
// 출력
// -------------
const result = solution(N, M, MATRIX);
console.log(result);

// [접근]
// ### 접근 방법
// 분리집합 문제의 일종으로, 간선이 이어지지 않은 연결리스트 그래프의 개수를 구하는 문제이다.

// 문제에서 구사과의 길목에 선물을 두어야 한다는 것은 그래프의 정점 어딘가에 선물을 두어야 한다는 의미가 된다.
// 따라서 연결리스트의 그래프의 개수 마다 하나씩 선물을 놓는다면, 그래프의 개수를 구하면 된다.

// ### 주의할 점
// 무방향 그래프를 탐색하면서 정점 1, 2, 3, 4, 5 가 있다고 가정해보자.
// 시작점이 정해지지 않았다면, 3번 정점을 시작점으로 3 -> 4 -> 5 탐색 후 탐색이 종료된다.
// 1, 2번 역시 그래프의 정점 중 하나이다. 그러나 1, 2번 정점은 탐색에서 빠지게 된다.

// 풀이에서 변수 visitNum 을 통해 visited에 방문기록을 메모이제이션하여
// visited !== visitNum 이면 현재 탐색중인 그래프와 이전 탐색 그래프가 같은 그래프.
// visited === visitNum 이면 새로 탐색된 그래프로 판단할 수 있다.