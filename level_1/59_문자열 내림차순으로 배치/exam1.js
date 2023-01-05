// 풀이 1.
function solution1(s) {
  const lowStr = s.match(/[a-z]/g)?.sort().reverse() ?? [],
        upStr = s.match(/[A-Z]/g)?.sort().reverse() ?? [];
  return [...lowStr, ...upStr].join('');
}

// 풀이 2.
function solution2(s) {
  return [...s].sort().reverse().join('');
}