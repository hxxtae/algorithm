// 풀이 1. 
function solution(n, m) {
  return [gcdFunc(n, m), lcmFunc(n, m)];
}

// 최대공약수
function gcdFunc(num1, num2) {
  const max = Math.max(num1, num2);
  const stack = [1];
  for(let n = 2; n <= max; n++) {
    if((num1 % n === 0) && (num2 % n === 0)) stack.push(n);
  }
  return stack.at(-1);
}

// 최소공배수
function lcmFunc(num1, num2) {
  const max = Math.max(num1, num2);
  const min = Math.min(num1, num2);
  let num = max,
      count = 1;
  while(num % min !== 0) num = max * ++count;
  return num;
}

// 풀이 2. 유클리드 호제법 알고리즘
function solution(n, m) {
  const gcdFunc = (num1, num2) => (num2 ? gcdFunc(num2, num1 % num2) : num1);
  const gcd = gcdFunc(n, m); // 최대공약수
  const lcd = n*m / gcd; // 최소공배수
  return [gcd, lcd];
}
