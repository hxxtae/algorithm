function solution(n) {
  const arr = Array.from(2001).fill(0);
  arr[1] = 1;
  arr[2] = 2;
  for(let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 1234567;
  }
  return arr[n];
}

// NOTE: DP 알고리즘

// 점화식 도출 : DP[n] = DP[n - 1] + DP[n - 2];
