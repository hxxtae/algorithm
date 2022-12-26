function solution(answers) {
  const arr = [[1,2,3,4,5], [2,1,2,3,2,4,2,5], [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]];
  const map = new Map([[1, 0], [2, 0], [3, 0]]);
  const len = answers.length;
  let maxCount = 0;
  for(let i = 0, 
    aLen = arr[0].length, 
    bLen = arr[1].length, 
    cLen = arr[2].length; i < len; i++) {
    const num = answers[i];
    if(num === arr[0][i % aLen]) map.set(1, map.get(1) + 1);
    if(num === arr[1][i % bLen]) map.set(2, map.get(2) + 1);
    if(num === arr[2][i % cLen]) map.set(3, map.get(3) + 1);
  }
  maxCount = Math.max(map.get(1), map.get(2), map.get(3));
  return [...map].filter(([student, count]) => maxCount <= count).map(([student, count]) => student);
}

// NOTE:
// 나눗셈의 나머지를 활용하여 비교하는 배열의 idx를 반복할 수 있다.
