// 풀이 1.
function solution(participant, completion) {
  const checkList = new Map();
  for(let i = 0, len = participant.length; i < len; i++) {
    let name = participant[i],
        cName = completion[i];
        
    checkList.set(name, (checkList.get(name) || 0) + 1);
    checkList.set(cName, (checkList.get(cName) || 0) - 1);
  }  
  for(let [name, count] of checkList) {
    if(count > 0) return name; 
  }
  return '';
}

// NOTE: 해시 사용

// 풀이 2. 
function solution(participant, completion) {
  const map = new Map();
  for(let i = 0, len = participant.length; i < len; i++) {
      const name = participant[i];
      map.set(name, (map.get(name) || 0) + 1);
  }
  for(let n = 0, len = completion.length; n < len; n++) {
      const name = completion[n];
      map.set(name, map.get(name) - 1);
  }
  return [...map].find(([name, count]) => count > 0)[0];
}

// NOTE: 해시 사용