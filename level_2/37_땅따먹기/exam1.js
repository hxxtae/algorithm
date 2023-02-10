function solution(land) {
  const dp = land[0];
  for(let i = 1, len = land.length; i < len; i++) {
    let [num0, num1, num2, num3] = land[i];
    num0 += Math.max(dp[1], dp[2], dp[3]);
    num1 += Math.max(dp[0], dp[2], dp[3]);
    num2 += Math.max(dp[0], dp[1], dp[3]);
    num3 += Math.max(dp[0], dp[1], dp[2]);
    dp[0] = num0;
    dp[1] = num1;
    dp[2] = num2;
    dp[3] = num3;
  }
  return Math.max(...dp);
}

// NOTE: DP(Dynamic Programming, 동적계획법)

// [접근]
// DP[0] = num0 + Math.max(DP[1], DP[2], DP[3]);
// DP[1] = num1 + Math.max(DP[0], DP[2], DP[3]);
// DP[2] = num2 + Math.max(DP[0], DP[1], DP[3]);
// DP[3] = num3 + Math.max(DP[0], DP[1], DP[2]);

// Math.max(DP[0], DP[1], DP[2], DP[3]);