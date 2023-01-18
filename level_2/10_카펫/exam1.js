function solution(brown, yellow) {
  for(let i = 1, len = Math.sqrt(yellow); i <= len; i++) {
    const yellowHeight = i;
    if(yellow % yellowHeight === 0) {
      const yellowWidth = yellow / yellowHeight;
      const brownCount = (yellowWidth * 2) + (yellowHeight * 2) + 4;
      if(brownCount === brown) return [yellowWidth + 2, yellowHeight + 2];
    }
  }
}

// [Math.sqrt(yellow)를 하는 이유]
// yellow의 전체 모양은 정사각형이나 직사각형이다.
// 사각형의 넓이는 (가로 x 세로) 로 가로 세로 비율은 달라도
// 그 넓이는 항상 일정합니다.

// 그래서,

// 정사각형의 넓이는 n^2 --> 한 변이 1 ~ n의 까지 모양만 가능
// 직사각형의 넓이는 nm (n > m) --> 한 변이 1 ~ m 까지 모양만 가능
