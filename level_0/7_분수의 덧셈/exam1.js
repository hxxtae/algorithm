function solution(numer1, denom1, numer2, denom2) {
  let n, d;
  const gcd = (a, b) => b ? gcd(b, a%b) : a;
  const gcdValueA = gcd(denom1, denom2);
  const add1 = parseInt(denom2 / gcdValueA);
  const add2 = parseInt(denom1 / gcdValueA);
  n = (numer1 * add1) + (numer2 * add2);
  d = gcdValueA * add1 * add2;
  const gcdValueB = gcd(n, d);
  return gcdValueB === 1 ? [n ,d] : [n / gcdValueB, d / gcdValueB];
}

// NOTE: 최대공약수 활용

// [접근]
// 분모A / 최대공약수 -> 분자B에 곱하는 공비
// 분모B / 최대공약수 -> 뷴자A에 곱하는 공비