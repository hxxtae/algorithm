function solution(A, B) {
  const sortA = [...A].sort((a, b) => a - b);
  const sortB = [...B].sort((a, b) => a - b);
  const len = A.length;
  let n = 0;
  let score = 0;
  for(let i = 0; i < len; i++) {
    if(n === len) break;
    const a = sortA[i];
    for(let j = n; j < len; j++) {
      const b = sortB[j];
      n = j + 1;
      if(a < b) {
        score++;
        break;
      }
    }
  }
  return score;
}

// NOTE: 투 포인터(비슷한)

// [생각할 점]
// 이 문제에서 엄청난 착각은 바로 A배열의 원소들의 위치를 이동시킬 수 없다는 점입니다.
// 생각해보면 B의 원소들이 자유롭게 이동하여, 항상 A의 값보다 유리하게 결과를 이끌어내야합니다.
// 근데 B원소들이 자유롭게 이동한다는 의미 자체가, A와 조합되는 모든 경우를 자유롭게 만들 수 있다는 의미이다.
// 즉, A배열의 원소 위치를 자유롭게 바꿔도 무방하다.

// [접근]
// 오름차순으로 정렬한 A, B 를 서로 작은 수 부터 비교합니다.
// B는 A의 수 보다 큰 수를 발견하면 score를 1 얻습니다.
// 그럼 정렬된 A,B에서 A를 기준으로 B의 수를 A와 비교하면서 a < b 인 경우를 카운트 해주기만 하면 됩니다.