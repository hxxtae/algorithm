function solution(board, skill) {
  const rLen = board.length;
  const cLen = board[0].length;
  const cumulativeArr = Array.from({length: rLen+1}, () => Array(cLen+1).fill(0));
  
  for(let i = 0, len = skill.length; i < len; i++) {
    const [state, r1, c1, r2, c2, num] = skill[i];
    const inc = (state*2)-3;
    cumulativeArr[r1][c1] += inc*num;
    cumulativeArr[r1][c2+1] += -(inc*num);
    cumulativeArr[r2+1][c1] += -(inc*num);
    cumulativeArr[r2+1][c2+1] += inc*num;
  }
  // 누적합
  for(let r = 0; r < rLen; r++) {
    for(let c = 1; c < cLen; c++) cumulativeArr[r][c] += cumulativeArr[r][c-1];
    if(r === 0) continue;
    for(let c = 0; c < cLen; c++) cumulativeArr[r][c] += cumulativeArr[r-1][c];
  }
  
  let count = 0;
  for(let r = 0; r < rLen; r++) {
    for(let c = 0; c < cLen; c++) {
      board[r][c] += cumulativeArr[r][c];
      if(board[r][c] > 0) count++;
    }
  }
  return count;
}

// NOTE: 누적합

// [접근]
// skill 배열의 (x, y)인 (c1, r1) 에서 (c2, r2) 까지의 모든 이차원 배열을 O(K*N*M)의 시간복잡도로
// 증가, 감소 연산을 수행하는 방식을 보통 떠올린다.
// 누적합을 이용하면 O(K+N*M) 의 시간복잡도로 풀이가 가능합니다.

// ex) skill[0]의 값 -> (1, 1)에서 (3, 3)까지 2를 증가

// 과정0. 누적합을 담을 배열 생성
// cumulativeArr = 
// [0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0]

// 과정1. 좌표값 (1, 1) / (3, 1) / (1, 3) / (3, 3) 를 다음과 같이 할당한다.
// - (3, 1) / (1, 3) 은 부호 반대
// [0,  2,  0,  0, -2, 0]
// [0,  0,  0,  0,  0, 0]
// [0, -2,  0,  0,  2, 0]
// [0,  0,  0,  0,  0, 0]
// [0,  0,  0,  0,  0, 0]

// 과정2. 각 열을 기준으로, 왼쪽 첫번째 열에서 부터 누적합을 각 노드에 다시 할당해 준다.
// [0,  2,  2,  2,  0, 0]
// [0,  0,  0,  0,  0, 0]
// [0,  0,  0,  0,  0, 0]
// [0, -2, -2, -2,  0, 0]
// [0,  0,  0,  0,  0, 0]

// 과정3. 각 열을 기준으로, 맨위 첫번째 행에서 부터 누적합을 각 노드에 다시 할당해 준다.
// [0,  2,  2,  2,  0, 0]
// [0,  2,  2,  2,  0, 0]
// [0,  2,  2,  2,  0, 0]
// [0,  0,  0,  0,  0, 0]
// [0,  0,  0,  0,  0, 0]

// 과정4. board에 해당 누적합을 더해준다.
// [5, 7, 7, 7, 5]
// [5, 7, 7, 7, 5]
// [5, 7, 7, 7, 5]
// [5, 5, 5, 5, 5]
// [5, 5, 5, 5, 5]

// ※ 핵심은 모든 skill의 누적합을 구하는 방법을 알아내는 것이 문제이다.
// -> skill의 (x, y)를 통해 1번 과정의 예시처럼 누적합의 범위를 전부 더한 뒤에
// 2, 3, 4 과정을 수행하면 된다.
