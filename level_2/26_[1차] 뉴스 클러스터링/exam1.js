function solution(str1, str2) {
  const strArr1 = str1.match(/[a-z]+/gi),
        len1 = strArr1.length;
  const strArr2 = str2.match(/[a-z]+/gi),
        len2 = strArr2.length;
  const map1 = new Map();
  const map2 = new Map();
  
  const str1Count = createStrCount(strArr1, len1, map1);
  const str2Count = createStrCount(strArr2, len2, map2);
  if(!str1Count && !str2Count) return 1 * 65536;
  
  let intersectionCount = 0;
  for(let [key, val] of map1) {
    intersectionCount += Math.min(val, (map2.get(key) || 0));
  }
  const unionCount = (str1Count + str2Count) - intersectionCount;
  
  return parseInt((intersectionCount / unionCount) * 65536);
}

function createStrCount(strArr, len, map) {
  let count = 0;
  for(let i = 0; i < len; i++) {
    const str = strArr[i];
    for(let j = 0, strLen = str.length; j < strLen - 1; j++) {
      const s = (str[j] + str[j + 1]).toLowerCase();
      map.set(s, (map.get(s) || 0) + 1);
      count++;
    }
  }
  return count;
}

// NOTE: 해시

// 중복 요소가 존재하는 두 집합의 교집합 갯수 -> Math.min(A집합 'str1'요소 개수, B집합 'str1'요소 개수)
// 중복 요소가 존재하는 두 집합의 합집합 갯수 -> Math.max(A집합 'str1'요소 개수, B집합 'str1'요소 개수)