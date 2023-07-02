function solution(sequence) {
  const len = sequence.length;
  const transSeq = sequence.map((num, idx) => idx % 2 === 0 ? -num : num);
  transSeq.unshift(0);
  let max = 0, min = 0;
  for(let i = 0; i < len; i++) {
    transSeq[i+1] += transSeq[i];
    max = Math.max(max, transSeq[i+1]);
    min = Math.min(min, transSeq[i+1]);
  }
  return max - min;
}

// NOTE: 누적값 / 부분 수열의 합의 최대값 구하기 (누적 최대합 - 누적 최소합)

// [접근]
// +부터 시작
// [2, -3, -6, -1, 3, 1, 2, -4]
// [2, -1, -7, -8, -5, -4, -2, -6]
// 최댓값 - 최솟값 = 2 - (-8) = 10

// -부터 시작
// [-2, 3, 6, 1, -3, -1, -2, 4]
// [-2, 1, 7, 8, 5, 4, 2, 6]
// 최댓값 - 최솟값 = 8 - (-2) = 10

// -> 서로 대칭 관계

// [주의할 점]
// max, min 초기값을 0으로 한다. -> 그렇지 않으면 max === min 인 경우 존재

// max가 -Infinity 이면, 
// -> 펄스 수열로 변환한 배열이 모두 음수인 경우에 max가 0이 아닌 음수가 된다. (max === min)
//    즉, 초기값이 0 이면 max눈 양수가 보장된다.

// min이 Infinity 이면,
// -> 펄스 수열로 변환한 배열이 모두 양수인 경우에 min이 0이 아닌 양수가 된다. (max === min)
//    즉, 초기값이 0 이면 min은 음수가 보장된다.