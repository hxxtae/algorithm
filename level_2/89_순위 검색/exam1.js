function solution(info, query) {
  info = info.map((data) => data.split(' '));
  query = query.map((order) => 
    order.replace(/(\s|and)+/g, (match) => match.length === 1 ? ' ' : '').split(' '));
  const infoLen = info.length;

  // 1.
  const selectArr = [
    ['java', 'python', 'cpp'], 
    ['frontend', 'backend'], 
    ['junior', 'senior'], 
    ['chicken', 'pizza']
  ];
  const map = new Map();
  const mapSetDfs = (deep, list) => {
    if(deep >= selectArr.length) {
      map.set(list.join(''), []);
      return;
    }
    for(let i = 0; i <= selectArr[deep].length; i++) {
      const select = selectArr[deep][i] || '-';
      list.push(select);
      mapSetDfs(deep+1, list);
      list.pop();
    }
  }
  mapSetDfs(0, []);
  
  // 2.
  // [[java, -] [frontend, -] [junior, -] [pizza, -]]
  const mapGetDfs = (deep, str, arr, score) => {
    if(deep >= arr.length) {
      map.get(str).push(score);
      return;
    }
    for(let i = 0; i < arr[deep].length; i++) {
      const node = arr[deep][i];
      mapGetDfs(deep+1, (str + node), arr, score);
    }
  }
  for(let i = 0; i < infoLen; i++) {
    let arr = [...info[i]];
    const score = arr.pop();
    arr = arr.map((item) => [item, '-']);
    mapGetDfs(0, '', arr, +score);
  }
  
  // 3.
  const lowerBound = (arr, score) => {
    let start = 0, end = arr.length;
    while(start < end) {
      let mid = parseInt((start+end) / 2);
      if(arr[mid] < score) start = mid + 1;
      else end = mid;
    }
    return end;
  }
  for(const scores of map.values()) {
    scores.sort((a, b) => a - b);
  }
  const result = [];
  for(const [key, score] of query) {
    const arr = map.get(key);
    const min = lowerBound(arr, score);
    const count = arr.length - min;
    result.push(count)
  }
  return result;
}

// NOTE: DFS / Hash / 이분탐색(Binary Search: Lower Bound)

// [접근]
// 1. 경우의 수를 key로 만들기 -> O(108)
// ex)
// [
//   ['java', 'python', 'cpp', '-'], 
//   ['frontend', 'backend', '-'], 
//   ['junior', 'senior', '-'], 
//   ['chicken', 'pizza', '-']
// ]
// =>
// java---
// java-junior-
// java-juniorpizza
// java--pizza
// ...
// ...
// ---pizza
// total : 4 x 3 x 3 x 3 = 108

// 2. key에 값 set -> O(16) x O(50,000)
// ex) [[java, -] [frontend, -] [junior, -] [pizza, -]]
// => 
// javafrontendjuniorpizza
// javafrontendjunior-
// javafrontend--
// java---
// ----
// -fontendjuniorpizza
// ...
// total : 2 x 2 x 2 x 2 = 16

// 3. query에 해당하는 값 찾기 -> O(100,000) x O(logn): 이진탐색(lower bound)