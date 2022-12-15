function solution(food) {
  const left = food.reduce((prev, curr, currIdx) => {
      if(currIdx === 0 || curr === 1) return prev;
      const addList = currIdx.toString().repeat(curr/2);
      return prev + addList;
  }, "");
  return left + "0" + [...left].reverse().join('');
}

// NOTE: 배열
