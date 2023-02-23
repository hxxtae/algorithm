function solution(numbers) {
  numbers = numbers.map(String);
  numbers.sort((a, b) => (a + b) > (b + a) ? -1 : 1);
  const result = numbers.join('');
  if([...result].every((num) => num === '0')) return '0';
  return result;
}

// NOTE: 정렬
