function solution(lottos, win_nums) {
  let zeroCount = 0;
  const bottom = lottos.reduce((prev, num) => {
      if(num === 0) zeroCount++;
      return win_nums.includes(num) ? prev - 1 : prev;
  }, 7);
  const top = zeroCount !== 0 ? bottom - zeroCount : bottom;
  return [top === 7 ? 6 : top, bottom === 7 ? 6 : bottom];
}

/*
NOTE: 놓치기 쉬운 테스트케이스로 
  lottos: [1, 2, 3, 4, 5, 6]
  win_nums: [7, 8, 9, 10, 11, 12]
  answer: [6, 6]
  인 경우가 존재한다.
*/
