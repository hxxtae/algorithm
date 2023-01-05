// 풀이 1.
function solution1(n, count = 1) {
  const arr = ['박', '수'];
  let result = '';
  while(count <= n) result += arr[count++ % 2];
  return result;
}

// 풀이 2.
function solution2(n) {
  return '수박'.repeat(n / 2) + (n % 2 !== 0 ? '수' : '');
}