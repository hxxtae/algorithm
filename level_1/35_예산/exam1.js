function solution(d, budget) {
  const newD = d.sort((a, b) => a - b);
  let result = 0;
  for(let i = 0, len = d.length; i < len; i++) {
    const pay = newD[i];
    if(pay > budget) return result;
    budget -= pay;
    result++;
  }
  return result;
}