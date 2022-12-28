function solution(nums) {
  const len = nums.length;
  const sum = [];
  let result = 0;
  const decimalFunc = (startNum) => {
    if(sum.length === 3) {
      const sumNum = sum.reduce((sum, num) => sum + num);
      if(decimalChk(sumNum)) return result++;
      return;
    }
    for(let n = startNum; n < len; n++) {
      const num = nums[n];
      sum.push(num);
      decimalFunc(n + 1);
      sum.pop();
    }
  }
  decimalFunc(0);
  return result;
}

function decimalChk(num) {
  if(num <= 1) return false;
  for(let i = 2; i * i <= num; i++) {
    if(num % i === 0) {
      return false;
    }
  }
  return true;
}

// NOTE: 재귀 사용