---
title: "DFS와 BFS"
date: "2023-12-09T12:24:00"
description: "일반적인 DFS와 BFS 유형의 문제"
algorithm: ["DFS", "BFS", "그래프 탐색-정점/간선"]
level: 실버2
label: true
---

## 문제 설명

그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다. 정점 번호는 1번부터 N번까지이다.

<br>

## 입력

첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.

<br>

## 출력

첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.

<br>

**예제 입력1 & 에제 출력1**

~~~text
4 5 1
1 2
1 3
1 4
2 4
3 4

~~~

~~~text
1 2 4 3
1 2 3 4

~~~

**예제 입력2 & 에제 출력2**

~~~text
5 5 3
5 4
5 2
1 2
3 4
3 1

~~~

~~~text
3 1 2 5 4
3 1 4 2 5

~~~

**예제 입력3 & 에제 출력3**

~~~text
1000 1 1000
999 1000

~~~

~~~text
1000 999
1000 999

~~~

<br>

## 풀이

~~~javascript
const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [N, M, V] = input[0];
const LIST = input.slice(1);

// -------------
// 풀이
// -------------
function solution(N, M, V, list) {
  const matrix = Array.from({ length: N }, () => []);
  for (const [start, end] of list) {
    matrix[start - 1][end - 1] = 1;
    matrix[end - 1][start - 1] = 1;
  }
  const visited1 = Array(N).fill(0);
  const dfsResult = [];
  
  // DFS
  const dfs = (deep, node) => {
    if (deep === N) {
      return true;
    }
    for (let i = 0; i < N; i++) {
      if (visited1[i]) continue;
      if (!matrix[node][i]) continue;
      visited1[i] = 1;
      dfsResult.push(i + 1);
      const loop = dfs(deep + 1, i);
      if (loop) return true;
    }
  }

  // BFS
  const bfs = () => {
    const queue = [V-1];
    const bfsResult = [V];
    const visited2 = Array(N).fill(0);
    visited2[V - 1] = 1;
    
    while (queue.length) {
      const node = queue.shift();
      if (bfsResult.length === N) break;
      for (let i = 0; i < N; i++) {
        if (visited2[i]) continue;
        if (!matrix[node][i]) continue;
        visited2[i] = 1;
        queue.push(i);
        bfsResult.push(i + 1);
      }
    }
    return bfsResult;
  }

  visited1[V - 1] = 1;
  dfsResult.push(V);
  dfs(1, V - 1);
  return [dfsResult.join(' '), bfs().join(' ')];
}

// -------------
// 출력
// -------------
const [dfs, bfs] = solution(N, M, V, LIST);
console.log(`${dfs}\n${bfs}`);
~~~

<br>

## 접근 및 설명

일반적인 순열, 조합의 DFS, BFS가 아닌 그래프 즉, 정점과 간선으로 이어진 그래프에서의 DFS, BFS 문제 이다.

일반적인 DFS, BFS의 경우 일차원 배열에서 각 인덱스의 순열 & 조합으로 경우의 수를 출력하지만, 그래프로 주어진 DFS, BFS의 경우 이차원 배열에서 각 정점의 간선을 통해 경우의 수를 출력한다.

해당 문제는 간선으로 이어진 정점을 통해 V 정점을 시작으로 DFS와 BFS로 순회하면서,
해당 정점으로 부터 간선으로 이어진 다른 정점을 작은 정점부터 결과 배열에 담아가면 된다.

---

ref: https://www.acmicpc.net/problem/1260