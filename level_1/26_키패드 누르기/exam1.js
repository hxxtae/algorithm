function solution(numbers, hand) {
  const sideKey = new Map([['1', 'L'], ['3', 'R'], ['4', 'L'], ['6', 'R'], 
                          ['7', 'L'], ['9', 'R'], ['*', 'L'], ['#', 'R']]);
  const num2Key = new Map([['1', 1], ['2', 0], ['3', 1], ['4', 2], ['5', 1], ['6', 2], 
                          ['7', 3], ['8', 2], ['9', 3], ['*', 4], ['0', 3], ['#', 4]]);
  const num5Key = new Map([['1', 2], ['2', 1], ['3', 2], ['4', 1], ['5', 0], ['6', 1], 
                          ['7', 2], ['8', 1], ['9', 2], ['*', 3], ['0', 2], ['#', 3]]);
  const num8Key = new Map([['1', 3], ['2', 2], ['3', 3], ['4', 2], ['5', 1], ['6', 2],
                          ['7', 1], ['8', 0], ['9', 1], ['*', 2], ['0', 1], ['#', 2]]);
  const num0Key = new Map([['1', 4], ['2', 3], ['3', 4], ['4', 3], ['5', 2], ['6', 3],
                          ['7', 2], ['8', 1], ['9', 2], ['*', 1], ['0', 0], ['#', 1]]);
  const result = [];
  const centerKey = (map, _left, _right, _num) => {
    const [left, right, num] = [_left.toString(), _right.toString(), _num.toString()];
    if(map.get(left) === map.get(right)) {
      if(hand === "left") {
        result.push('L');
        return [num, right];
      }
      result.push('R');
      return [left, num];
    }
    if(map.get(left) < map.get(right)) {
      result.push('L');
      return [num, right];
    }
    result.push('R');
    return [_left, _num];
  }
  
  let [left, right] = ['*', '#'];
  for(let i = 0, len = numbers.length; i < len; i++) {
    const num = numbers[i];
    if(num === 2) {
      [left, right] = [...centerKey(num2Key, left, right, num)];
    }
    if(num === 5) {
      [left, right] = [...centerKey(num5Key, left, right, num)];
    }
    if(num === 8) {
      [left, right] = [...centerKey(num8Key, left, right, num)];
    }
    if(num === 0) {
      [left, right] = [...centerKey(num0Key, left, right, num)];
    }
    const sideNum = sideKey.get(num.toString());
    result.push(sideNum);
    if(sideNum === 'L') [left, right] = [num, right];
    if(sideNum === 'R') [left, right] = [left, num];
  }
  
  return result.join('');
}

// NOTE: 해시 사용
// 2020 카카오 인턴십