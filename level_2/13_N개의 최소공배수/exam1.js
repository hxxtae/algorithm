function solution(arr) {
  arr.sort((a, b) => a - b);
  const min = arr[0],
        max = arr.at(-1);
  const len = arr.length;
  let minNum = min;
  
  while(1) {
    if(minNum < max) {
      minNum += min;
      continue;
    }
    if(findLcm(minNum, len, arr)) return minNum;
    else minNum += min;
  }
}

// 공배수 확인 함수
function findLcm(num, len, arr) {
  for(let i = 1; i < len; i++) {
    if(num % arr[i]) return false;
  }
  return true;
}

// NOTE:
// 유클리드 호제법을 이용하여 최대공약수를 구한 다음 최소공배수를 구할 수 있지만
// 최소공배수 정의를 바탕으로 알고리즘 작성. 
// -> 비교하는 수 중에서 최솟값의 배수를 비교하는 수로 나누어 떨어지면 공배수이다.