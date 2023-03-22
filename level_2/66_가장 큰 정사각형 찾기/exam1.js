function solution(board) {
  const rowLen = board.length;
  const colLen = board[0].length;
  const dp = [Array(colLen + 1).fill(0), ...Array.from({length: rowLen}, (v, i) => [0, ...board[i]])];
  let squareLen = 0;
  for(let i = 1; i <= rowLen; i++) {
    for(let j = 1; j <= colLen; j++) {
      const num = board[i-1][j-1];
      if(num === 1) {
        dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
        squareLen = Math.max(squareLen, dp[i][j]);
      }
    }
  }
  return squareLen ** 2;
}

// NOTE: DP

// BFS를 이용하여 풀 수는 있지만 효율적으로 알고리즘이 동작하지 않는다.

// [접근]
// 제일 큰 정사각형을 찾는 방법(점화식)이 존재합니다.

//    0 1 2 3 4 5 6 7
//    --------------
// 0| 0 0 0 0 0 0 0 0
// 1| 0 0 1 1 1 0 1 1
// 2| 0 1 1 1 1 0 1 1
// 3| 0 1 1 1 1 0 1 1
// 4| 0 0 1 1 1 1 1 1
// 5| 0 1 1 1 1 1 1 1
// 6| 0 0 0 1 1 1 1 0
// 7| 0 0 0 1 1 1 1 0

// 점화식
// DP[i][j] = Math.min(DP[i-1][j-1], DP[i-1][j], DP[i][j-1]) + 1;