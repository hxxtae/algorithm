// 풀이 1. 스택 사용
function solution1(t, p) {
  const len = [...p].length;
  const compareStr = [];
  return [...t].reduce((sum, num) => {
    compareStr.push(num);
    if(compareStr.length === len) {
      if(+compareStr.join('') <= +p) sum++;
        compareStr.shift();
    }
    return sum;
  }, 0);
}

// 풀이 2. slice
function solution2(t, p) {
  const pLen = [...p].length;
  let result = 0;
  for(let i = 0, tLen = [...t].length; i <= tLen - pLen; i++) {
      if(+t.slice(i, pLen + i) <= +p) result++;
  }
  return result;
}