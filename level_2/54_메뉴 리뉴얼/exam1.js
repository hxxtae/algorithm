function solution(orders, course) {
  const compareOrders = [orders.shift()];
  const map = new Map();
  const len = orders.length;
  for(let i = 0; i < len; i++) {
    const order = orders[i];
    for(let combineOrder of combineListFunc(order)) {
      combineCountToMap(combineOrder, compareOrders, map);
    }
    compareOrders.push(order);
  }
  const courseMap = new Map(course.map(num => [num, 0]));
  const resultMap = new Map(course.map(num => [num, []]));
  
  // 가장 큰 코스요리 조합 갯수 파악하기(course에 해당하는 갯수만)
  for(let [order, count] of map) {
    const orderLen = order.length;
    if(!course.includes(orderLen)) continue;
    courseMap.set(orderLen, Math.max(courseMap.get(orderLen), count));
  }
  
  // 가장 큰 코스요리 조합 갯수의 요소들 파악하기
  for(let [order, count] of map) {
    const orderLen = order.length;
    const maxCount = courseMap.get(orderLen);
    if(!maxCount) continue;
    if(maxCount > count) continue;
    resultMap.get(orderLen).push(order);
  }
  return [...resultMap]
    .map(([key, orders]) => orders
      .map(order => [...order].sort().join('')))
    .flat()
    .sort();
}

// 해당 조합 카운트
function combineCountToMap(combineOrder, compareOrders, map) {
  const reg = new RegExp(`[^${combineOrder}]`, 'g');
  for(let order of compareOrders) {
    const sameOrder = order.replace(reg, '');
    if(sameOrder.length < 2) continue;
    if(sameOrder.length !== combineOrder.length) continue;
    map.set(sameOrder, (map.get(sameOrder) || 2) + 1);
    break;
  }
}

// 조합 리스트 배열 (2자리 이상 조합)
function combineListFunc(order) {
  const orders = [];
  const list = [];
  const len = order.length;
  const dfs = (deep) => {
    if(list.length >= 2) orders.push(list.join(''));
    for(let i = deep; i < len; i++) {
      list.push(order[i]);
      dfs(i + 1);
      list.pop();
    }
  }
  dfs(0);
  return orders;
}

// NOTE: 해시 / 브루트포스
// 어려웠음... 어렵게 접근하니까 어렵지...
// 나중에 좀 더 쉽게 접근해서 풀어보기!!

// [접근]
// 각 orders의 요소들을 비교하여 '교집합' 을 찾는다.(각 요소 1:1 비교)
// -> 여기서 교집합은 '비교하는 order'의 모든 조합에 대해 '비교당하는 order'에 해당 조합의 요소가 있는가를 말한다.

// 요약: 각 orders의 요소들을 비교하는데, 비교 시 조합의 길이에 따라 조합의 교집합 개수를 카운트