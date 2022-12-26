function solution(n, lost, reserve) {
  const newReserve = reserve.filter((v) => !lost.includes(v));
  const newLost = lost.filter((v) => !reserve.includes(v)).sort((a, b) => a - b);
  const map = new Map();
  for(let student = 1; student <= n; student++) {
    map.set(student, newLost.includes(student) ? 0 : newReserve.includes(student) ? 2 : 1);
  }
  for(let student of newLost) {
    if(map.get(student - 1) > 1) {
      map.set(student - 1, (map.get(student - 1) - 1));
      map.set(student, 1);
    }
    else if(map.get(student + 1) > 1) {
      map.set(student + 1, (map.get(student + 1) - 1));
      map.set(student, 1);
    }
  }
  return  [...map].reduce((result, [student, clothesNum]) => {
    return clothesNum > 0 ? result += 1 : result;
  }, 0);
}

// NOTE: 
// 테스트케이스 n, [4, 2], [3, 5]
// 인 경우 모두 체육복을 빌려입을 수 있는데,
// lost의 [4, 2] 가 정렬되지 않으면 결과가 다르게 나올 수 있다.
