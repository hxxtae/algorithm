function solution(scores) {
  if(scores.length === 1) return 1;
  const [targetA, targetB] = scores.shift();
  const targetSum = targetA + targetB;
  
  let maxScore = 0;
  const newScores = [];

  // 근무태도 점수 "내림차순" / 근무태도 점수가 같으면 동료 평가 점수 "오름차순"
  scores.sort((a, b) => (b[0] - a[0] === 0 ? a[1] - b[1] : b[0] - a[0]));
  for(const [scoreA, scoreB] of scores) {
    if(targetA < scoreA && targetB < scoreB) return -1;
    if(scoreB < maxScore) continue;
    else {
      maxScore = Math.max(maxScore, scoreB);
      newScores.push(scoreA + scoreB);
    }
  }
  newScores.push(targetSum);
  newScores.sort((a, b) => b - a);
  const result = newScores.indexOf(targetSum) + 1;
  return result;
}

// NOTE: Sort / 문제 해결 능력

// [접근]
// 근무 태도 점수로 내림차순 정렬하며, 근무 태도 점수가 같으면 동료 평가 점수를 오름차순 정렬 하였다.

// 이렇게 정렬하면 '근무 태도 점수'는 현재 값이 다음 값 보다 큰 수를 보장하지만,
// '동료 평가 점수'의 경우 다음 값의 근무 태도 점수가 동일하면 동료 평가 점수의 다음 값은 큰 수로 보장되며 -> Math.max,
// 다음 값의 근무 태도 점수가 다르다면(점수가 낮아짐) 동료 평가 점수는 기존의 Math.max 보다 작거나 클 수 있다.

// 결론적으로, 다음 값의 동료 평가 점수가 "동료 평가 점수의 Max" 값 보다 작다면, 
// 인센티브를 받지 못하는 사원을 제외할 수 있다.
