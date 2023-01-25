function solution(clothes) {
  const map = new Map();
  for(let i = 0, len = clothes.length; i < len; i++) {
    const [name, kind] = clothes[i];
    map.set(kind, (map.get(kind) || 0) + 1);
  }
  let result = 1;
  for(let value of map.values()) {
    result *= (value + 1);
  }
  return result - 1;
}

// NOTE: 해시

// [수학적 풀이]
// 각 자리수 종류들의 조합 경우의 수
// 1개 선택: a + b + c
// 2개 선택: ab + ac + bc
// 3개 선택: abc
// -> 총 경우의 수는 (a + b + c) + (ab + ac + bc) + (abc) 가 됩니다.

// 옷의 종류가 3가지고 각각의 옷의 개수가 a, b, c라면 
// (x+a)(x+b)(x+c) = x^3 + (a+b+c)x^2 + (ab+bc+ca)x + (abc)라는 식이 정립됩니다.