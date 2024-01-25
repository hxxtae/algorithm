const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const N = +stdin;

// -------------
// 풀이 (DFS)
// -------------
function solution(n) {
  // NOTE: N의 최대값 22를 고려하여 visited의 길이를 51로 선언
  const visited = Array.from({ length: 51 }, () => Array(51).fill(0));
  
  const findWay = (y, x, way, prevWay) => {
    // NOTE: 이동하는 방향에 따른 2가지 방향 설정
    // 1. Up-Right(북동): U(북), DR(남동)
    // 2. Up-Left(북서): U(북), DL(남서)
    // 3. U(북): UR(북동), UL(북서)
    // 4. Down-Right(남동): D(남), UR(북동)
    // 5. Down-Left(남서): D(남), UL(북서)
    // 6. D(남): DR(남동), DL(남서)
    const wayObj = {
      UR: [1, 5],
      UL: [1, 3],
      U: [0, 2],
      DR: [4, 0],
      DL: [4, 2],
      D: [5, 3]
    }
    // NOTE: 북동(0), 북(1), 북서(2), 남서(3), 남(4), 남동(5)
    const X = [1, 0, -1, -1, 0, 1];
    const Y = [-1, -1, -1, 1, 1, 1];
    const wayStr = ['UR', 'U', 'UL', 'DL', 'D', 'DR'];
    way = wayObj[prevWay][way];

    return [y + Y[way], x + X[way], wayStr[way]];
  }

  const dfs = (y, x, cnt, prevWay) => {
    if (visited[y][x]) {
      if (cnt === n) {
        result += 1;
      }
      return;
    }
    if (cnt >= n) return;
    visited[y][x] = 1;
    for (let i = 0; i < 2; i++) {
      const [nextY, nextX, nextWay] = findWay(y, x, i, prevWay);
      dfs(nextY, nextX, cnt + 1, nextWay);
    }
    visited[y][x] = 0;
  }

  let result = 0;
  visited[25][25] = 1;
  dfs(24, 25, 0, 'U');
  
  return result;
}

// -------------
// 출력
// -------------
const result = solution(N);
console.log(result);

// [접근]
// ### 어려운 점
// 문제를 이해하는 과정이 힘들었다..

// 잘못 이해
// -> 임의의 점에서 부터 시작하여 다른 점을 탐색한다. 이동 시 점이 이미 방문한 점이며, N번째 방향을 회전한 횟수인 경우의 수를 구하여라
// ex) (y, x)일 때, 좌표 (10, 10) 에서 부터 탐색
// 맞게 이해
// -> 점과 연결된 세 변 중 하나를 향해 이동을 한 후에, 다른 점으로의 탐색을 이어나간다. 이하 동문
// ex) (y, x)일 때, 좌표 (10, 10) 에서 북쪽 방향으로 이동한 좌표 (9, 10) 에서 부터 탐색, (10, 10)은 방문 체크

// ### 방법
// - 현재 점에서 다음 점의 방향으로 이동하면서 DFS 탐색을 수행한다.
// - 문제는 현재 점에서 다음 점으로 이동하기 위한 방향이 정해져 있다.
// - 점이 아래에서 위로 올라오면(up, 북쪽방향) 다음으로 가는 방향은 오른쪽 대각선(up-right, 북동쪽방향), 왼족 대각선(up-left, 북서쪽 방향)이 존재한다.
// - 즉, 이전에 이동한 방향에 따라서 다음 점으로 가는 방향이 정해져 있으며, DFS탐색 시 다음 탐색 방향을 지정해 주어야 한다.

// ### 제출 문제
// nodejs로 정답 코드 제출 시 시간초과로 처리되어 버린다.