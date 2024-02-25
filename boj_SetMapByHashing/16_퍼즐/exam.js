const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' '));

// -------------
// 풀이 (BFS)
// -------------
function solution(input) {
  const visited = new Set();

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  // -------------
  // BFS_1 : 제출 시 메모리 초과
  // -------------
  const bfs1 = (startKey) => {
    const queue = [[startKey, startKey.indexOf('0'), 0]]; // [startKey, zeroIdx, startDeep]
    visited.add(startKey);

    let queueIdx = 0;
    while (queueIdx < queue.length) {
      const [key, zeroIdx, deep] = queue[queueIdx];
      queueIdx++;
      if (key === '123456780')
        return deep;

      const nextKeyArr = [...key];
      // NOTE: 1차원 배열의 idx를 2차원 배열의 y, x로
      const [zeroY, zeroX] = [Math.floor(zeroIdx / 3), (zeroIdx % 3)];
      for (let i = 0; i < 4; i++) {
        const [nextY, nextX] = findWay(zeroY, zeroX, i);
        if (nextY < 0 || nextX < 0 || nextY >= 3 || nextX >= 3) continue;
        // NOTE: 2차원 배열의 y, x를 1차원 배열의 idx로
        const nextIdx = (nextY * 3) + nextX;

        [nextKeyArr[zeroIdx], nextKeyArr[nextIdx]] = [nextKeyArr[nextIdx], nextKeyArr[zeroIdx]];
        const nextKey = nextKeyArr.join('');
        if (!visited.has(nextKey)) {
          visited.add(nextKey);
          queue.push([nextKey, nextIdx, deep + 1]);
        }
        [nextKeyArr[zeroIdx], nextKeyArr[nextIdx]] = [nextKeyArr[nextIdx], nextKeyArr[zeroIdx]];
      }
    }

    return -1;
  }

  // -------------
  // BFS_2 : 제출 코드
  // -------------
  const bfs2 = (startKey) => {
    let queue = [startKey]; // startKey
    let deep = 0;
    visited.add(startKey);
    const direction = [-1, 1, -3, 3];

    while (queue.length) {
      const nextQueue = [];
      for (const key of queue) {
        if (key === '123456780') return deep;

        const zeroIdx = key.indexOf('0');
        for (const d of direction) {
          const nextIdx = zeroIdx + d;
          if (nextIdx < 0 || nextIdx >= 9) continue;
          if (zeroIdx % 3 === 0 && d === -1) continue;
          if (zeroIdx % 3 === 2 && d === 1) continue;

          const min = Math.min(zeroIdx, nextIdx);
          const max = Math.max(zeroIdx, nextIdx);
          const nextKey = key.substring(0, min) + key[max] + key.substring(min + 1, max) + key[min] + key.substring(max + 1);
          if (!visited.has(nextKey)) {
            visited.add(nextKey);
            nextQueue.push(nextKey);
          }
        }
      }
      deep++;
      queue = nextQueue;
    }

    return -1;
  }

  const initKey = input.flatMap(item => item).join('');

  return bfs2(initKey);
}

// -------------
// 출력
// -------------
const result = solution(input);
console.log(result);

// [접근]
// 해당 2차원 배열(퍼즐)의 모습을 문자열로 만들고, 해당 문자열을 해시의 key로 두어, 만들어 지는 퍼즐의 모습을 카운트 한다.
// '103425786' : 0
// '123405784' : 1
// ...
// '123456780' : 3

// BFS, 너비 우선 탐색을 통해 동일 깊이의 퍼즐의 모습을 같은 카운트로 기록하여 탐색을 이어간다.
// 퍼즐의 모습에 따른 카운트를 기록하기 위한 visited는 2차원 배열 형태가 아닌, 해시 구조의 형태로 노드(퍼즐의 모습)의 visit 여부를 판단한다.
// -> 해시에 없는 key(퍼즐의 모습)는 이전 카운트에 +1을 할당해 주고, 중복된 key(퍼즐의 모습)는 무시한다.

