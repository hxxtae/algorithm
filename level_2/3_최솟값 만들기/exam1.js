function solution(A,B){
  const aArr = A.sort((a, b) => a - b);
  const bArr = B.sort((a, b) => b - a);
  let sum = 0;
  for(let i = 0, len = aArr.length; i < len; i++) {
      sum += (aArr[i] * bArr[i]);
  }
  return sum;
}

// NOTE: 정렬 사용