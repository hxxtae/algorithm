function solution(n, costs) {
  let totalPrice = 0;
  const parent = Array.from({length: n}, (v, i) => i);
  
  costs.sort((a, b) => a[2] - b[2]);
  
  const getParent = (parent, x) => {
    return parent[x] === x ? x : getParent(parent, parent[x]);
  }
  
  const unionParent = (parent, x, y) => {
    const [a, b] = [getParent(parent, x), getParent(parent, y)];
    if(a < b) return parent[b] = a;
    return parent[a] = b;
  }
  
  const findParent = (parent, x, y) => {
    const [a, b] = [getParent(parent, x), getParent(parent, y)];
    if(a === b) return true;
    return false;
  }
  
  for(const [a, b, price] of costs) {
    // 이미 연결된 노드는 PASS -> 사이클 방지
    if(!findParent(parent, a, b)) {
      unionParent(parent, a, b);
      totalPrice += price;
    }
  }
  return totalPrice;
}

// NOTE: 최소 신장 트리 -> 크루스칼, 합집합 찾기(union-find)
