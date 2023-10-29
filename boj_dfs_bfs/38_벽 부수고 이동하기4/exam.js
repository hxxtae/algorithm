const fs = require('fs');
const stdin = fs.readFileSync('./input_4.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(''));
const [NM, ...MAPS] = input;
const [N, M] = [+NM[0], +NM[2]];

// -------------
// 풀이 (DFS) - 시간초과
// -------------
function solution(n, m, maps) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, cnt, chk) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (maps[nextY][nextX] === "0" && visited[nextY][nextX] !== chk) {
          visited[nextY][nextX] = chk;
          cnt = dfs(nextY, nextX, cnt + 1, chk);
        }
      }
    }
    return cnt;
  }

  let chk = 1; // 해당 벽을 부술 때 방문 여부 체크 변수
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (maps[r][c] === "1") {
        visited[r][c] = chk;
        const count = dfs(r, c, 1, chk);
        maps[r][c] = (count % 10);
        chk++;
      }
    }
  }
  return maps.map(arr => arr.join('')).join('\n');
}

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, maps) {
  const visitedZero = Array.from({ length: n }, () => Array(m).fill([]));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];
    return [y + Y[way], x + X[way]];
  }

  // 1-1. 0의 연결된 데이터 생성
  const dfs = (y, x, cnt, arr) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY >= 0 && nextX >= 0 && nextY < n && nextX < m) {
        if (maps[nextY][nextX] === "0" && visitedZero[nextY][nextX].length === 0) {
          visitedZero[nextY][nextX] = arr;
          cnt = dfs(nextY, nextX, cnt + 1, arr);
        }
      }
    }
    return cnt;
  }
  
  // 1. 각 좌표마다 존재하는 "0"의 연결된 데이터 생성 ([구분번호(연결된 모든 0은 동일), 연결된 0의 개수])
  let zeroChk = 1; // 구분번호
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (maps[r][c] === "0" && visitedZero[r][c].length === 0) {
        const arr = [zeroChk];
        visitedZero[r][c] = arr; // 객체의 참조무결성 특성 활용!
        const count = dfs(r, c, 1, arr);
        arr.push(count);
        zeroChk++;
      }
    }
  }

  // 2-1. 벽의 주변에 존재하는 "0"의 이동할 수 있는 칸 탐색
  const aroundOfWall = (y, x) => {
    const zeroList = [];
    let zeroCnt = 1;
    for (let i = 0; i < 4; i++) {
      const [aroundY, aroundX] = findWay(y, x, i);
      if (aroundY >= 0 && aroundX >= 0 && aroundY < n && aroundX < m) {
        if (maps[aroundY][aroundX] === "0") {
          if (!zeroList.includes(visitedZero[aroundY][aroundX][0])) {
            zeroList.push(visitedZero[aroundY][aroundX][0]);
            zeroCnt += visitedZero[aroundY][aroundX][1];
          }
        }
      }
    }
    return zeroCnt;
  }
  
  // 2. 벽이 존재하는 곳 허물고 이동할 수 있는 칸 개수 세기
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (maps[r][c] === "1") {
        const count = aroundOfWall(r, c);
        maps[r][c] = parseInt(count % 10, 10);
      }
    }
  }

  return maps.map(item => item.join('')).join('\n');
}

// -------------
// 출력
// -------------
const result = solution(N, M, MAPS);
console.log(result);
