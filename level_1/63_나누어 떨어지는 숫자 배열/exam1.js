// 풀이 1.
function solution1(arr, divisor) {
  const resultArr = arr
    .reduce((arr, num) => !(num % divisor) ? [...arr, num] : arr, [])
    .sort((a, b) => a - b);
  return resultArr.length ? resultArr : [-1];
}

// 풀이 2.
function solution2(arr, divisor) {
  const resultArr = arr.filter(num => !(num % divisor)).sort((a, b) => a - b);
  return resultArr.length ? resultArr : [-1];
}