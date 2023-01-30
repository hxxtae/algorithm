// 풀이 1.
function solution1(numbers, target) {
  const len = numbers.length;
  let cnt = 0;

  const dfs = (depth, result) => {
    if (len === depth) {
      if (target === result) cnt++
      return;
    }
    dfs(depth + 1, result + numbers[depth]);
    dfs(depth + 1, result - numbers[depth]);
  }
  dfs(0, 0);
  return cnt;
}

// 풀이 2.
let count = 0;
function solution2(numbers, target, deep = 0, sum = 0) {
  if(deep === numbers.length) {
    if(target === sum) return ++count;
    return;
  }
  solution(numbers, target, deep + 1, sum + numbers[deep]);
  solution(numbers, target, deep + 1, sum - numbers[deep]);
  return count;
}

// NOTE: 완전탐색 / DFS & BFS / 재귀