function solution(array, commands) {
  const result = [];
  for(let i = 0, len = commands.length; i < len; i++) {
      const [start, end, n] = commands[i];
      const num = array.slice(start - 1, end).sort((a, b) => a - b)[n - 1];
      result.push(num);
  }
  return result;
}

// NOTE: 정렬 사용