// 1.
function solution(k, m, score) {
  const len = score.length;
  let sum = 0;
  score.sort((a, b) => b - a);

  for(let i = 0; i < len; i++) {
      i += m - 1;
      if(i >= len) break;
      const min = score[i];
      sum += (min * m);
  }
  return sum;
}

// 2.
function solution(k, m, score) {
  return score.sort()
    .filter((_, i) => !((score.length - i) % m))
    .reduce((prev, curr) => prev + curr, 0) * m;
}
// NOTE: 인덱스를 특정 숫자 m 으로 나눈 나머지가 0인 값을 반환한다면
//       m 칸수 마다의 값을 반환하는 방법이다. (등차수열)

