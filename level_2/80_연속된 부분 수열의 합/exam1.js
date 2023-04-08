function solution(sequence, k) {
  const result = [];
  let sum = 0;
  let end = 0;
  for(let start = 0, len = sequence.length; start < len; start++) {
    while(sum < k && end < len) {
      sum += sequence[end];
      end++;
    }
    if(sum === k) result.push([start, end - 1]);
    sum -= sequence[start];
  }
  result.sort((a, b) => {
    if((a[1]-a[0]) === (b[1]-b[0])) return a[0] - b[0];
    return (a[1]-a[0]) - (b[1]-b[0]);
  });
  return result[0];
}

// NOTE: 투포인터