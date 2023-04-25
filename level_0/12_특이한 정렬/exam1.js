function solution(numlist, n) {
  return numlist.sort((a, b) => {
      const A = Math.abs(n - a), B = Math.abs(n - b);
      return A === B ? b - a : A - B;
  });
}

// NOTE: 정렬