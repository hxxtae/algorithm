function solution(gems) {
  const size = new Set(gems).size;
  const gemLen = gems.length;
  const result = [1, gemLen]; // [start_number, end_number]
  let end = 0;
  let range = gemLen;
  const rangeArr = [];
  for(let start = 0; start < gemLen; start++) {
    const set = new Set(gems.slice(start, end));
    while(set.size < size && end < gemLen) {
      const gem = gems[end];
      set.add(gem);
      end++;
    }
      
    if(set.size === size) {
      const this_range = gems.slice(start, end).length;
      if(range > this_range) {
        range = this_range;
        result[0] = start + 1;
        result[1] = end;
      }
    }
  }
  return result;
}

// NOTE: 투포인터 (With Set)
// 테스트 정확성은 성공하지만, 계속된 Set을 통한 중복제거로 테스트 효율성은 실패한다.

function solution(gems) {
  const size = new Set(gems).size;
  const gemLen = gems.length;
  const map = new Map();
  const result = [1, gemLen]; // [start_number, end_number]
  let end = 0;
  let range = 0;
  let minRange = gemLen;
  for(let start = 0; start < gemLen; start++) {
    while(map.size < size && end < gemLen) {
      const gem = gems[end];
      map.set(gem, (map.get(gem) || 0) + 1);
      range++;
      end++;
    }
    
    if(map.size === size) {
      if(minRange > range) {
        minRange = range;
        result[0] = start + 1;
        result[1] = end;
      }
      const gem = gems[start];
      if(map.get(gem)) map.set(gem, map.get(gem) - 1);
      if(map.get(gem) === 0) map.delete(gem);
      range--;
    }
  }
  return result;
}

// NOTE: 투포인터 (With Hash(Map))
// 테스트 정확성 및 효율성 모두 성공