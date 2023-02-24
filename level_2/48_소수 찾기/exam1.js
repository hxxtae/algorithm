function solution(numbers) {
  const len = numbers.length;
  const visited = Array(len).fill(0);
  const decimals = new Set();
  const dfs = (sumNum) => {
    if(sumNum.length > 0) {
      if(findDecimal(+sumNum)) {
        decimals.add(+sumNum);
      }
    }
    for(let n = 0; n < len; n++) {
      const num = numbers[n];
      if(visited[n]) continue;
          
      visited[n] = 1;
      dfs(sumNum + num);
      visited[n] = 0;
    }
  }
  dfs('');
  return decimals.size;
}

function findDecimal(num) {
  if(num === 1 || num === 0) return false;
  for(let i = 2; i * i <= num; i++) {
      if(num % i === 0) return false;
  }
  return true;
}

// NOTE: 완전탐색 / DFS
