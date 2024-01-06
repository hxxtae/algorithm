const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[W, H], ...HOUSE] = input;

// -------------
// 풀이 (DFS)
// -------------
function solution(w, h, house) {
  const visited = Array.from({ length: h }, () => Array(w).fill(0));
  
  const findWay = (y, x, way, posOfY) => {
    const diagnol = (posOfY % 2 === 0) ? -1 : 1;
    const X = [1, 0, -1, 0, diagnol, diagnol];
    const Y = [0, 1, 0, -1, -1, 1];
    // NOTE: 탐색 방향 -> 동, 남, 서, 북, (북서(짝수), 남서(짝수) / 북동(홀수), 남동(홀수))

    return [y + Y[way], x + X[way]];
  }

  const dfsOfOutSide = (y, x) => {
    house[y][x] = -1;

    for (let i = 0; i < 6; i++) {
      const [nextY, nextX] = findWay(y, x, i, y + 1);
      if (nextY < 0 || nextX < 0 || nextY >= h || nextX >= w) continue;
      if (house[nextY][nextX]) continue;
      dfsOfOutSide(nextY, nextX);
    }
  }

  const dfs = (y, x) => {
    visited[y][x] = 1;

    for (let i = 0; i < 6; i++) {
      const [nextY, nextX] = findWay(y, x, i, y + 1);
      if (nextY < 0 || nextX < 0 || nextY >= h || nextX >= w) {
        cnt += 1;
        continue;
      }
      if (house[nextY][nextX] === -1) {
        cnt += 1;
        continue;
      }
      if (house[nextY][nextX] !== 1) continue;
      if (visited[nextY][nextX]) continue;
      dfs(nextY, nextX);
    }
  }

  // NOTE: 최상단 or 최하단 바깥 구간 탐색
  for (const r of [0, h - 1]) {
    for (let c = 0; c < w; c++) {
      if (house[r][c]) continue;
      dfsOfOutSide(r, c);
    }
  }
  
  // NOTE: 맨왼쪽 or 맨오른쪽 바깥 구간 탐색
  for (const c of [0, w - 1]) {
    for (let r = 0; r < h; r++) {
      if (house[r][c]) continue;
      dfsOfOutSide(r, c);
    }
  }
  
  // NOTE: 정육각형의 바깥 방향 벽의 길이 탐색
  let cnt = 0;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (house[r][c] !== 1) continue;
      if (visited[r][c]) continue;
      dfs(r, c);
    }
  }

  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(W, H, HOUSE);
console.log(result);

// [접근]

// ### 탐색 방향 정의
// 정육각형의 각 변의 위치에 따라 정점의 이동 방향을 결정한다.
// - 정육면체의 4개의 변은 동, 서, 남, 북 방향으로 정점의 좌표를 이동할 수 있다.
// - 정육면체 4개의 변을 제외한 나머지 2개의 변은 대각선 방향으로 정점의 좌표를 이동할 수 있다.
// - 단, y 좌표의 값이 홀수이면 대각선 방향을 남동, 북동 뱡향이 되며, 짝수이면 대각선 뱡향은 남서, 북서 방향이 된다.
// (맨왼쪽 최상단 y의 좌표를 1로 두며 즉, 첫 번째 행은 홀수로 판단한다.)

// ### 과정
// 1. 바깥 즉, 외부와 내부를 구분 지어 주기 위해서 주어진 맵의 테두리를 시작으로 정육각형 방향으로 좌표를 탐색한다.

// 2. 탐색하면서 외부로 판단되는 모든 정점을 - 1로 초기화 한다.
//    - 빈 공간(외부) 이지만 집으로 둘러싸여 있다면 바깥 부분이라 판단하지 않는다.
//    - 외부 : -1
//    - 내부 : 1
//    - 둘러쌓인 빈 공간 : 0

// 3. 모든 정점의 좌표를 시작으로 탐색하여 집이 위치하는 정점에서 정육각형 방향으로 좌표를 탐색한다.

// 4. 탐색하면서 외부 공간 즉, 바깥 방향으로 판단되는 정점의 좌표인 경우 카운트.
