// 풀이 1.
function solution1(n) {
  let result = 0;
  for(let i = 1; i <= n; i++) 
    if(n % i === 0) result += i;
  return result;
}

// 풀이 2.
function solution2(n) {
  return Array.from({length: n}, (_, i) => i + 1).reduce((sum, num) => {
    return sum += (n % num === 0) ? num : 0;
  }, 0);
}
