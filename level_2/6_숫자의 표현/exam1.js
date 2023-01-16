function solution(n) {
  let count = 1,
      sum = 0;
  for(let i = 1; i <= Math.floor(n / 2); i++) {
    for(let j = i; j <= n; j++) {
      if(sum > n) break;
      if(sum === n) {
        count++;
        break;
      }
      sum += j;
    }
    sum = 0;
  }
  return count;
}

// NOTE: 완전탐색
