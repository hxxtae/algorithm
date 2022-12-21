function solution(sizes) {
  const [maxWidth, maxHeight] = sizes.reduce((prev, [width, height]) => {
    if(width > height) return [Math.max(prev[0], width), Math.max(prev[1], height)];
    return [Math.max(prev[0], height), Math.max(prev[1], width)];
  }, [0, 0]);
  return maxWidth * maxHeight;
}

// NOTE: 완전탐색 사용
