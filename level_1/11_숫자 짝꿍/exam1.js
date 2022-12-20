function solution(X, Y) {
  let result = '';
  const xMap = new Map(), yMap = new Map();
  const xLen = X.length, yLen = Y.length;
  const len = xLen > yLen ? xLen : yLen;
  for(let i = 0; i < len; i++) {
      xMap.set(X[i], (xMap.get(X[i]) || 0) + 1);
      yMap.set(Y[i], (yMap.get(Y[i]) || 0) + 1);
  }
  for(let n = 9; n >= 0; n--) {
      const xVal = xMap.get(n.toString()), 
            yVal = yMap.get(n.toString());
      if(!(xVal && yVal)) continue;
      const min = Math.min(xVal, yVal);
      result += n.toString().repeat(min);
  }
  if(result[0] == '0') return '0';
  return result || '-1';
}

// NOTE: 해쉬 사용
