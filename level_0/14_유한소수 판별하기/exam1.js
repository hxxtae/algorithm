// 풀이 1.
function solution1(a, b) {
  const list = [];
  // 최대공약수 알고리즘
  const gcd = (a, b) => b === 0 ? a : gcd(b, a%b);
  // 기약분수(분모)
  let num = b / gcd(a, b);
  
  if(num === 1) return 1;
  
  // 소인수분해 알고리즘
  for(let i = 2; i <= num; i++) {
    while(num % i === 0) {
      num /= i;
      list.push(i);
    }
  }
  return list.filter(n => (n !== 2 && n !== 5)).length > 0 ? 2 : 1;
}

// NOTE: 최대공약수 / 소인수분해 알고리즘

// 풀이 2.
function solution2(a, b) {
  let num = b;
  while(num % 2 === 0) num /= 2;
  while(num % 5 === 0) num /= 5;
  return (a % num === 0) ? 1 : 2;
}

// NOTE: 소인수분해 알고리즘