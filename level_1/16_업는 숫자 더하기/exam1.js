function solution(numbers) {
  const numList = Array.from({length: 10}, (v, i) => i);
  return numList.reduce((sum, num) => (!numbers.includes(num) ? sum += num : sum), 0);
}
