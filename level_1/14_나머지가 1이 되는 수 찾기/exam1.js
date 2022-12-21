function solution(n) {
  for(let num = 1; num <= n; num++) {
      if(n % num === 1) return num;
  }
}
