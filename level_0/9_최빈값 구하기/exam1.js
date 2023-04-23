function solution(array) {
  const map = new Map();
  array.forEach((num) => map.set(num, (map.get(num) || 0) + 1));
  const mapList = [...map].sort((a, b) => b[1] - a[1]);
  return mapList.length === 1 ? 
    mapList[0][0] : (mapList[0][1] === mapList[1][1]) ?
    -1 : mapList[0][0];
}

// NOTE: 문제 해결 능력