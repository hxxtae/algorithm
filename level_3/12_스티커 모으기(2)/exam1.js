// 풀이 1.
function solution1(sticker) {
  const len = sticker.length;
  let dpA = [0, 0];
  let dpB = [0, 0];
  let maxA = 0, maxB = 0;
  for(let i = 0; i < len - 1; i++) {
    dpA = [Math.max(...dpA), dpA[0] + sticker[i]];
  }
  maxA = Math.max(...dpA);
  for(let i = 1; i < len; i++) {
    dpB = [Math.max(...dpB), dpB[0] + sticker[i]];
  }
  maxB = Math.max(...dpB);
  return len === 1 ? sticker[0] : len === 2 ? Math.max(sticker[0], sticker[1]) : Math.max(maxA, maxB);
}

// 풀이 2.
function solution2(sticker) {
  var answer = 0;
  var dp1 = [];
  var dp2 = [];
  var len = sticker.length;

  if(len < 3) return Math.max.apply(null, sticker);

  // 인덱스 0번째 부터 선택 시
  dp1[0]=sticker[0];
  dp1[1]=dp1[0];
  for(var i=2;i<len-1;i++){
    dp1[i]= Math.max(dp1[i-1], dp1[i-2]+sticker[i]);
  }
  // 인덱스 1번째 부터 선택 시
  dp2[0]=0;
  dp2[1]=sticker[1];
  for(var i=2;i<len;i++){
    dp2[i]= Math.max(dp2[i-1], dp2[i-2]+sticker[i]);
  }

  return Math.max(dp1.at(-1), dp2.at(-1));
}

// NOTE: DP

// 점화식: dp[n] = max(dp[n-1], dp[n-2] + dp[n])