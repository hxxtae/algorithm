function solution(name, yearning, photo) {
  const nameMap = name.map((str, index) => [str, yearning[index]]);
  const map = new Map(nameMap);
  let result = [];
  for(const arr of photo) {
    const sum = arr.reduce((sum, str) => sum += +(map.get(str) || 0), 0);
    result.push(sum);
  }
  return result;
}

// NOTE: Hash