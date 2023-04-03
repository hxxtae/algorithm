// 풀이 1.
function solution1(storey) {
  const arr = [...storey.toString()];
  let count = 0;
  let up = 0;
  while(arr.length) {
    const num = +arr.pop();
    const roundNum = num + up;
    // 1의 자리에서 숫자가 5보다 큰 경우
    if(roundNum > 5) {
      count += (10 - roundNum);
      up = 1;
      if(arr.length === 0) count += 1;
    // 1의 자리에서 숫자가 5인 경우
    } else if(roundNum === 5) {
      if(arr.at(-1) >= 5) up = 1;
      else up = 0;
      count += 5;
    // 1의 자리에서 숫자가 5보다 작은 경우
    } else if(roundNum < 5) {
      count += roundNum;
      up = 0;
    }
  }
  return count;
}

// NOTE: 문제 해결 능력

// [접근]
// storey의 수를 1의 자리에서 5을 기준으로 올림, 내림을 판단하여 
// 최소 count의 합을 구한다.

// 풀이 2.
function solution2(storey) {
  if(storey <= 5) return storey;
  const remain = storey % 10;
  const share = (storey - remain) / 10;
  return Math.min(remain + solution(share), (10 - remain) + solution(share + 1));
  // Math.min(카운트(내림) + 내림, 카운트(올림) + 올림)
  // Math.min(나머지만큼 내려서 계산한 값, 나머지에 더해서 올림되어 계산한 값)
}

// NOTE: 문제 해결 능력
