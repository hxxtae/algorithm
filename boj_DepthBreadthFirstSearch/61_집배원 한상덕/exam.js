const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const INPUT = stdin.split('\n');

// -------------
// 풀이 (BFS)
// -------------
function solution(input) {
  const N = +input[0];
  let visited = Array.from({ length: N }, () => Array(N).fill(0));
  const graph = [];
  const graphOfSloop = [];
  for (let i = 1; i <= (N + N); i++) {
    if (i <= N) graph.push(input[i].trim().split(''));
    else graphOfSloop.push(input[i].split(' ').map(Number));
  }

  // P의 경사 높이 / K 개수 카운트 (houst count)
  let [pY, pX] = [0, 0];
  let pHeight = 0;
  let kCount = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (graph[r][c] === 'P') {
        pHeight = graphOfSloop[r][c];
        [pY, pX] = [r, c];
      }
      if (graph[r][c] === 'K') kCount++;
    }
  }
  
  // 투 포인터 범위 설정
  let range = new Set();
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      range.add(graphOfSloop[r][c]);
    }
  }
  range = [...range].sort((a, b) => a - b);
  
  const findWay = (y, x, way) => {
    const X = [1, 1, 0, -1, -1, -1, 0, 1];
    const Y = [0, 1, 1, 1, 0, -1, -1, -1];

    return [y + Y[way], x + X[way]];
  }

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = 1;
    let kVisitedCnt = 0;

    while (queue.length) {
      const [y, x] = queue.pop();
      if (graph[y][x] === 'K') {
        kVisitedCnt++;
        if (kVisitedCnt === kCount) return true;
      }

      for (let i = 0; i < 8; i++) {
        const [nextY, nextX] = findWay(y, x, i);
        if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
        if (graphOfSloop[nextY][nextX] < range[left] || graphOfSloop[nextY][nextX] > range[right]) continue;
        if (visited[nextY][nextX]) continue;
        visited[nextY][nextX] = 1;
        queue.push([nextY, nextX]);
      }
    }

    return false;
  }

  let diff = Infinity;
  let left = 0, right = 0; // left: range array left_index / right: range array right_index
  while (range[right] <= range[range.length - 1]) {
    while (1) {
      let result = false;
      if (pHeight >= range[left] && pHeight <= range[right]) {
        result = bfs(pY, pX);
        visited = visited.map(arr => arr.fill(0));
      }
      if (!result) break;
      
      if (diff > (range[right] - range[left]))
        diff = (range[right] - range[left]);
      left++;
    }
    right++;
  }

  return diff;
}

// -------------
// 출력
// -------------
const result = solution(INPUT);
console.log(result);

// see commentary: https://comyoung.tistory.com/279

// [접근]
// DFS or BFS + Two Point

// 시작점, 총 집(K)의 갯수, 경사높이(range) 종류 설정하기
// 1-1. 시작점 : 우체국의 위치(P)
// 1-2. 총 집의 갯수 : K의 갯수
// 1-3. 경사높이 종류 : 모든 경사높이의 종류

// 2. 모든 경사높이의 종류(range)를 생성
//   - 지역의 경사로를 set과 정렬을 통해 중복을 제거

// 3. 시작점(P)의 경사가 최소(left) ~ 최대(right) 경사 사이일 경우에만 BFS를 시작한다. 
//   - BFS 탐색 시에 집을 방문할 때마다 K를 1씩 증가한다.

// 4. 모든 집(K)을 방문했을 때 최소 피로도를 구한다. -> range[right] - range[left]

// 5. 4번이 아닐 경우에, 최대(right)가 남아있을 경우 right을 1 증가한다.

// 6. 4번, 5번 모두 아닐 경우 종료한다.

// 7. 최소 피로도를 출력한다.