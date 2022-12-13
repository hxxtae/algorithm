function solution(number) {
  const len = number.length;
  let count = 0;
  
  function findSamChongSa(deep, sumArr) {
      if(sumArr.length === 3) {
          const sum = sumArr.reduce((prev, curr) => prev + curr, 0);
          if(sum === 0) count = ++count;
          return;
      }
  
      for(let i = deep; i < len; i++) {
          sumArr.push(number[i]);
          findSamChongSa(i + 1, sumArr);
          sumArr.pop();
      }
  }
  findSamChongSa(0, []);
  return count;
}

// NOTE: 재귀 사용
