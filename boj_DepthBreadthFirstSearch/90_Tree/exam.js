const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n');
for (let i = 1; i < input.length;) {
  const N = +input[i++].trim();
  const M = +input[i++].trim();
  const EDGES = input.slice(i, i + M).map(item => item.split(' ').map(Number));
  i += M;
  const result = solution(N, M, EDGES);
  console.log(result);
}

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, edges) {
  const parents = Array.from({ length: n + 1 }, (_, idx) => idx);

  const getParent = (node) => {
    return parents[node] === node ? node : getParent(parents[node]);
  }

  const setParent = (x, y) => {
    const [a, b] = [getParent(x), getParent(y)];
    if (a > b) return parents[a] = b;
    return parents[b] = a;
  }

  const findParent = (x, y) => {
    const [a, b] = [getParent(x), getParent(y)];
    if (a === b) return true;
    return false;
  }

  let thisGraph = false;
  for (const [a, b] of edges) {
    if (!findParent(a, b)) { // 풀이 설명: 1번 조건 확인
      setParent(a, b);
    } else {
      thisGraph = true;
    }
  }
  
  for (let i = 1; i <= n; i++) {
    parents[i] = getParent(i);
  }
  const set = new Set(parents.slice(1));
  // 풀이 설명: 2번 조건 확인
  if (set.size > 1) thisGraph = true;

  return thisGraph ? 'graph' : 'tree';
}

// -------------
// 제출 코드
// - 코드 제출 시 fs 모듈을 사용하여 제출하면 런타입 에러(EACCES: permission denied) 가 발생한다.
// - redline 모듈을 사용하여 제출.
// -------------
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let radline_input = [];
rl.on('line', function (line) {
  radline_input.push(line);
}).on('close', function () {
  // -------------
  // 입력 & 출력
  // -------------
  for (let i = 1; i < radline_input.length;) {
    const N = +radline_input[i++].trim();
    const M = +radline_input[i++].trim();
    const EDGES = radline_input.slice(i, i + M).map(item => item.split(' ').map(Number));
    i += M;
    const result = solution(N, M, EDGES);
    console.log(result);
  }

  // -------------
  // 풀이 (DFS)
  // -------------
  function solution(n, m, edges) {
    const parents = Array.from({ length: n + 1 }, (_, idx) => idx);
  
    const getParent = (node) => {
      return parents[node] === node ? node : getParent(parents[node]);
    }
  
    const setParent = (x, y) => {
      const [a, b] = [getParent(x), getParent(y)];
      if (a > b) return parents[a] = b;
      return parents[b] = a;
    }
  
    const findParent = (x, y) => {
      const [a, b] = [getParent(x), getParent(y)];
      if (a === b) return true;
      return false;
    }
  
    let thisGraph = false;
    for (const [a, b] of edges) {
      if (!findParent(a, b)) {
        setParent(a, b);
      } else {
        thisGraph = true;
      }
    }
    
    for (let i = 1; i <= n; i++) {
      parents[i] = getParent(i);
    }
    const set = new Set(parents.slice(1));
    if (set.size > 1) thisGraph = true;
  
    return thisGraph ? 'graph' : 'tree';
  }
  process.exit();
});

// [접근]
// ### 접근방법
// 최소신장트리 알고리즘 활용
// 최소신장트리의 경우 최소한의 간선(엣지)을 가지고 각 정점에 최소 크기를 가지는 간선들을 연결한다.
// 즉, 최소한의 간선을 사용하기 때문에 트리 구조가 만들어 진다. (해당 문제에서 간선의 크기는 무시)

// 만일 트리라면
// 1. N - 1개의 간선이 존재하거나 (정점과 정점을 연결하는 간선은 하나씩만 존재한다.)
// 2. 모든 정점에서 루트 노드는 하나만 존재한다.

// 만일 그래프라면
// 1. N - 1개 보다 많은 간선의 개수이거나 (간선이 N-1개 보다 하나 이상 더 많은 경우)
// 2. 모든 정점에서 이어지는 루트 노드가 두 개 이상 존재한다. (간선이 하나 부족한 경우 즉, 간선이 절단된 경우)
//    - 연결 그래프가 두 개 이상 존재

// ref: https://loosie.tistory.com/611