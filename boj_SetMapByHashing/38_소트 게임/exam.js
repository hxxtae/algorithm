const fs = require('fs');
const stdin = fs.readFileSync('./input_5.txt').toString().trim();

// -------------
// 입력
// -------------
const [[N, K], ARR] = stdin.split('\n').map(item => item.trim().split(' ').map(Number));

// -------------
// 풀이
// -------------
function solution(n, k, arr) {
  const visited = new Map();

  const bfs = (init) => {
    const end = [...init].sort((a, b) => a - b).join('');
    const len = init.length;
    const queue = [[init, 0]]; // [num, deep]
    visited.set(init, 0); // key: initNum / value: initDeep
    if (init === end) return 0;

    while (queue.length) {
      const [num, deep] = queue.shift();
      
      for (let start = 0; start <= len - k; start++) {
        const numArr = [...num];
        const re = numArr.slice(start, start + k).reverse();
        numArr.splice(start, k, ...re);
        const reNum = numArr.join('');
        
        if (visited.has(reNum)) continue;
        visited.set(reNum, deep + 1);
        queue.push([reNum, deep + 1]);
        if (visited.has(end)) return visited.get(end);
      }
    }

    return -1;
  }

  return bfs(arr.join(''));
}

// -------------
// 출력
// -------------
const result = solution(N, K, ARR);
console.log(result);

// [접근]
// 문제에서 주어진 순열이 K의 길이 만큼 부분 정렬된다.
// 반복된 K길이 만큼의 부분 정렬을 통해 순열이 오름차순으로 정렬될 때 몇 번 만에 정렬되는지 카운트를 구해야 한다.

// 1. 너비 우선 탐색을 통해 각 부분 정렬된 순열을 탐색한다.

// 2. 중복된 탐색의 경우 메모이제이션 visited를 통해 중복 탐색은 하지 않는다.
//    - visited는 해시로 구성한다.
//    - 탐색을 통해 중복된 정렬 수가 있으면 다시 탐색을 하지 않도록 막아준다.

// 3. 너비 우선 탐색을 통해 가장 먼저 오름차순을 만든 탐색의 깊이(카운트)를 반환한다.

// 4. 모든 탐색을 마쳐도 오름차순을 만들지 못한 경우 -1를 반환한다.