function solution(elements) {
  const result = new Set();
  for(let i = 1, len = elements.length; i <= len; i++) {
    for(let j = 0; j < len; j++) {
      let start = j,
          end = j + i;
      const sum = elements.slice(start, end).reduce((sum, num) => sum += num);
      result.add(sum);
      if(i === len) break;
    }
    elements.push(elements[i - 1]);
  }
  return result.size;
}

// NOTE: 완전탐색 / 수열

// 7, 9, 1, 1, 4 인 원형 수열 중
// 길이가 1인 부분 수열은 7, 9, 1, 1, 4
// 길이가 2인 부분 수열은 (7, 9), (9, 1), (1, 1), (1, 4), (4, 7)
// 길이가 3인 부분 수열은 (7, 9, 1), (9, 1, 1), (1, 1, 4), (1, 4, 7), (4, 7, 9)
// 길이가 4인 부분 수열은 (7, 9, 1, 1), (9, 1, 1, 4), (1, 1, 4, 7), (1, 4, 7, 9), (4, 7, 9, 1)
// 길이가 5인 부분 수열은 (7, 9, 1, 1, 4) -> 어차피 자리만 바뀌고 수열의 합은 같다.

// 배열 [7, 9, 1, 1, 4] 는 원형 수열 이므로 길이마다 수열의 첫번째 요소부터 배열 뒤에 추가 하여
// 원형 수열에서 부분수열의 길이마다 만들어 질 수 있는 수열의 합을 찾는다.