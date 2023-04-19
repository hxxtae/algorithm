function solution(num, total) {
  const plus_arr = Array.from({length: 1000}, (v, i) => i + 1);
  const neg_arr = Array.from({length: 1000}, (v, i) => -(i + 1)).reverse();
  const arr = [...neg_arr, 0, ...plus_arr];
  const len = arr.length;
  const result = [];
  let idx = 0;
  while(idx !== (len - num)) {
    const list = arr.slice(idx, idx + num);
    const sum = list.reduce((num, sum) => sum + num);
    if(sum === total) {
      result.push(...list);
      break;
    }
    idx++;
  }
  return result;
}

// NOTE: 배열의 특성

// [접근]
// 일정한 배열의 길이와 배열의 index를 활용하여, 연속된 배열의 값이 total이 되는 경우
// 해당 배열을 결과값으로 반환한다.

function solution(num, total) {
  const min = Math.ceil(total/num - Math.floor(num/2));
  return Array(num).fill(0).map((v, i) => i+min);
}

// NOTE: 가우스 공식

// [접근]
// n: 연속된 길이
// a = total / n
// b = n / 2
// c = a - b
// (c + 0) + (c + 1) + ... + (c + (n - 1)) = total

// total / n => 수열의 평균값 
// n / 2 => 수열의 마지막에서 중앙까지의 등차 계산 
// ceil와 floor를 활용 수 있는 이유는 등차가 1이기때문이다.