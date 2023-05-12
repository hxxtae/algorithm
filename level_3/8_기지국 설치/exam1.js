function solution(n, stations, w) {
  const range = (w * 2) + 1; // 1은 다음 인덱스(아파트) 탐색을 위해
  const len = stations.length;
  let count = 0;
  let idx = 0;
  for(let i = 1; i <= n;) { // i++ 필요 X
    if(idx < len && i >= stations[idx] - w) {
      i = stations[idx] + w + 1; // 1은 다음 인덱스(아파트) 탐색을 위해
      idx++;
    } else {
      i += range;
      count++;
    }
  }
  return count;
}

// NOTE: 문제 해결 능력

//[접근]
// 2억건의 데이터를 탐색해야 하므로, 효율적인 탐색 알고리즘 작성이 필요하다.
// 즉, 2억건 데이터 탐색 시 필요없는 구간 탐색을 건너뛰어 시간초과를 방지해야 한다.