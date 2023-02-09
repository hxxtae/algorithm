function solution(want, number, discount) {
  const wantArr = want.map((item, idx) => [item, number[idx]]);
  const mapWant = new Map(wantArr);
  const map = new Map();
  const ANY = 'any';
  map.set(ANY, 0);
  let count = 0;
  
  for(let i = 0, len = discount.length; i < len; i++) {
    if(i < 10) {
      const item = mapWant.get(discount[i]) ? discount[i] : ANY;
      map.set(item, (map.get(item) || 0) + 1);
      if(i === 9) allItemsCheck(map, mapWant) && count++;
      continue;
    }
    const minusItem = mapWant.get(discount[i - 10]) ? discount[i - 10] : ANY,
          plusItem = mapWant.get(discount[i]) ? discount[i] : ANY;
    map.set(minusItem, map.get(minusItem) - 1);
    map.set(plusItem, (map.get(plusItem) || 0) + 1);
    allItemsCheck(map, mapWant) && count++;
  }
  return count;
}

function allItemsCheck(map, mapWant) {
  for(let [key, val] of mapWant) {
    if(!map.get(key)) return false;
    if(map.get(key) === val) continue;
    else return false;
  }
  return true;
}

// NOTE: 해시

// [접근]
// ※ 두 개의 해시를 사용하여, 두 해시를 비교하여 해결
// mapWant의 경우 아이템들의 필요 충족 갯수를 가지고 있는 고정 테이블.
// map의 경우 discount를 돌면서 아이템들을 카운트 갯수를 가지고 있는 동적 테이블.

// allItemsCheck 함수를 통해 동적 해시 테이블을 고정 해시 테이블과 비교하여 만족하는 경우에만
// count에 +1 을 카운트 해준다.