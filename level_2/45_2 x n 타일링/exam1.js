function solution(n) {
  const arr = [];
  arr[0] = 0;
  arr[1] = 1;
  arr[2] = 2;
  for(let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 1000000007;
  }
  return arr[n];
}

// NOTE: DP(Dynamic Programming, 동적계획법)

// 피보나치 수열