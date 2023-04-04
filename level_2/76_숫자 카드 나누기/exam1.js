function solution(arrayA, arrayB) {
  const GCD = (a, b) => b ? GCD(b, a % b) : a;
  const aLen = arrayA.length;
  const bLen = arrayB.length;
  let gcdA = GCD(arrayA[0], arrayA[1]);
  let gcdB = GCD(arrayB[0], arrayB[1]);
  // n개의 수 최대공약수 -> gcdA
  for(let i = 2; i < aLen; i++) {
    gcdA = GCD(gcdA, arrayA[i]);
  }
  // n개의 수 최대공약수 -> gcdB
  for(let i = 2; i < bLen; i++) {
    gcdB = GCD(gcdB, arrayB[i]);
  }
  // arrayA, arrayB가 서로의 최대공약수로 나누어 떨어지는지 확인
  for(let n = 0; n < aLen; n++) {
    if(arrayB[n] % gcdA === 0) gcdA = 1;
    if(arrayA[n] % gcdB === 0) gcdB = 1;
  }
  if(gcdA === 1 && gcdB === 1) return 0;
  return Math.max(gcdA, gcdB);
}

// NOTE: 최대공약수