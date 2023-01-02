// 풀이 1.
function solution1(arr) {
  const min = [...arr].sort((a, b) => b - a).pop();
  return arr.length > 1 ? arr.filter((num, idx) => num !== min) : [-1];
}

// 풀이 2.
function solution2(arr) {
  const min = Math.min(...arr);
  const result = arr.filter(num => num !== min);
  return result.length > 1 ? result : [-1];
}

// 풀이 3.
function solution3(arr) {
  if(arr.length <= 1) return [-1];
  arr.splice(arr.indexOf(Math.min(...arr)), 1);
  return arr;
}
