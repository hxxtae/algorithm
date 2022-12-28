// 1. 논리연산자로 풀이
function solution1(n, arr1, arr2) {
  const result = [];
  for(let i = 0; i < n; i++) {
    const map1 = [...arr1[i].toString(2).padStart(n, '0')],
          map2 = [...arr2[i].toString(2).padStart(n, '0')];
    let answer = '';
    for(let j = 0; j < n; j++) answer += (+map1[j] || +map2[j]) ? '#' : ' ';
      result.push(answer);
  }
  return result;
}

// 2. 비트연산자로 풀이
function solution2(n, arr1, arr2) {
  const result = [];
  for(let i = 0; i < n; i++) {
    const bitSum = arr1[i] | arr2[i];
    const answer = bitSum.toString(2).padStart(n, '0').replace(/1|0/g, (num) => +num ? '#' : ' ');
    result.push(answer);
  }
  return result;
}

// ---------------

// 2018 KAKAO BLIND RECRUITMENT