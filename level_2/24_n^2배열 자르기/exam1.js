// 풀이 1.
function solution1(n, left, right) {
  const result = [];
  let thisRow = parseInt(left / n);
  let cnt = (thisRow >= (left % n) ? 1 : (left % n) - thisRow);
  for(let idx = left; idx <= right; idx++) {
    if(thisRow !== parseInt(idx / n)) {
      thisRow += 1;
      cnt = 1;
    }
    if(thisRow >= (idx % n)) result.push(thisRow + 1);
    else result.push(thisRow + 1 + cnt++);
  }
  return result;
}

// [접근 방법]
// 0. row 위치 = 몫, col 위치 = 나머지
// 1. left의 idx/n의 '몫' => left의 값의 row 위치
// 2. left의 idx%n의 '나머지' => left의 값의 col 위치
// ('나머지' 값이 '몫' 보다 같거나 작은 값들은 = 몫 + 1)
// ('나머지' 값이 '몫' 보다 큰 값들은 = (몫 + 1) + 1, (몫 + 1) + 2, (몫 + 1) + 3, ... , n)
    
// if => idx/n의 '몫'이 이전 몫과 비교하여 증가한 경우 새로운 기준 몫 으로 변경
// if => 맨 처음 반복문 시작 전 left의 위치가 몫(row 위치) 보다 나머지(col 위치)가 큰 경우
//       cnt 의 크기 부터 값이 시작됨

// 풀이 2.
function solution2(n, left, right) {
  const result = [];
  for(let i = left; i <= right; i++) {
    let x = parseInt(i / n) + 1
    let y = (i % n) + 1;
    result.push(Math.max(x, y));
  }
  return result;
}

// [접근 방법]
// (x, y)의 행과 열에서 x, y의 최댓값을 반환한 값.
// (1, 1) = 1 / (1, 2) = 2 / (1, 3) = 3
// (2, 1) = 2 / (2, 2) = 2 / (2, 3) = 3
// (3, 1) = 3 / (3, 2) = 3 / (3, 3) = 3