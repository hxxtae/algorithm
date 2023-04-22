function solution(quiz) {
  const result = quiz
    .map((item) => item
      .split('=')
      .map(str => str.trim())
      .reduce((left, right) => {
        const op = left.split(' ');
        const answer = op[1].includes('+') ? (+op[0] + +op[2]) : (+op[0] - +op[2]);
        return (answer === +right) ? 'O' : 'X';
      }));
  return result;
}

// NOTE: 문제 해결 능력