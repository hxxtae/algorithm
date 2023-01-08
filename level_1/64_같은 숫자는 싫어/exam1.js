// 풀이 1.
function solution1(arr) {
  const answer = [arr[0]];
  for(let i = 1, len = arr.length; i < len; i++) {
    const num = arr[i],
          prevNum = arr[i - 1];
    if(num === prevNum) continue;
    answer.push(num);
  }
  return answer;
}

// 풒이 2.
function solution2(arr) {
  return arr.filter((num, idx, obj) => num !== obj[--idx]);
}
