function solution(cards) {
  const result = [];
  const len = cards.length;
  let visited = Array(len + 1).fill(0);
  cards = [0, ...cards];
  
  const repeat = (idx, count) => {
    // 이전에 방문한 경우
    if(visited[idx]) {
      result.push(count);
      return;
    }
    // 이전에 방문하지 않은 경우
    visited[idx] = 1;
    repeat(cards[idx], count + 1);
  }
  for(let i = 1; i <= len; i++) {
    if(visited[i]) continue;
    const num = cards[i];
    repeat(num, 0);
  }
  result.sort((a, b) => b - a);
  return result.length === 1 ? 0 : result[0] * result[1];
}

// NOTE: DFS

// [문제 부가 설명]
// 모든 탐색이 끝나고 '가장 많은 카드를 가진 박스 두 개'를 곱하면 답을 구할 수 있습니다.
// 주의할 점은 첫번째 상자와 두번째 상자를 곱하는 것이 아닌 '가장 많은 상자 두 개를 곱하여' 답을 구하셔야 합니다.