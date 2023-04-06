function solution(data, col, row_begin, row_end) {
  const sortOfCol = (col, arr) => {
    arr.sort((a, b) => {
      const idx = col - 1;
      return (a[idx] === b[idx] ? b[0] - a[0] : a[idx] - b[idx]);
    });
  }
  const allColModOfRow = (start, end, arr) => {
    return arr
      .slice(start - 1, end)
      .map((nums, idx) => nums.reduce((sum, num) => sum + (num % (start + idx)), 0));
  }
  sortOfCol(col, data);
  const sArr = allColModOfRow(row_begin, row_end, data);
  const answer = sArr.reduce((result, num) => result^num);
  return answer;
}
