function solution(routes) {
  const sortRoutes = [...routes].sort((a, b) => a[0] - b[0]);
  const visited = Array(routes.length).fill(0);
  let count = 0;
  
  for(let i = 0, len = routes.length; i < len; i++) {
    if(visited[i]) continue;
    let [s, e] = sortRoutes[i];
    visited[i] = 1;
    for(let j = i + 1; j < len; j++) {
      const [comS, comE] = sortRoutes[j];
      if(s <= comS && e >= comS) {
        if(e > comE) e = comE;
          visited[j] = 1;
        }
      else break;
    }
    count++;
  }
  return count;
}

// NOTE: 문제 해결 능력, 그리디 알고리즘

// [접근]
// 문제에서 차량의 [진입, 진출] 지점이 존재합니다.
// 핵심은 routes를 진입 지점 기준으로 오름차순 "정렬" 후에 순차적으로 비교하여 중복된 구간을 찾는다.
// 즉, 정렬된 차량을 순차적으로 i 차량의 [진입, 진출] 구간 안에 j 차량의 진입 지점이 중복되는지 찾는다.

// 만약 j 차량의 진출 지점이 i 차량의 [진입, 진출] 구간에 들어온다면 i 차량의 진출 지점을 j 차량의 진출 지점으로 변경하고
// 계속해서 다음 차량의 [진입, 진출] 구간과 비교한다.