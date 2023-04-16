function solution(dots) {
  const inclinationArr = [];
  for(let i = 0, len = dots.length; i < len - 1; i++) {
    const [x1, y1] = dots[i];
    for(let j = i + 1; j < len; j++) {
      const [x2, y2] = dots[j];
      const inclination = Math.abs(x1 - x2) / Math.abs(y1 - y2); // 기울기
      inclinationArr.push(inclination);
    }
  }
  return [...new Set(inclinationArr)].length !== inclinationArr.length ? 1 : 0;
}

// NOTE: 기울기