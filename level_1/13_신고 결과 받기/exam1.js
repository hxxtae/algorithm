function solution(id_list, report, k) {
  const countMap = new Map(); // NOTE: id별 신고 받은 횟수
  const users = id_list.reduce((prev, curr) => {
    prev[curr] = new Map();
    return prev;
  }, {});
  const len = report.length;
  
  for(let i = 0; i < len; i++) {
    const [A, B] = report[i].split(' '); // NOTE: A: 이용자id, B: 신고한id
    const map = users[A];
      
    map.set(B, (map.get(B) || 0) + 1);
    if(map.get(B) > 1) continue;
      
    countMap.set(B, (countMap.get(B) || 0) + 1);
  }
  
  return id_list.reduce((arr, A) => {
    const map = users[A];
    let mailCnt = 0;
    for(let [B, count] of map) {
      if(countMap.get(B) < k) continue;
      mailCnt++;
    }
    arr.push(mailCnt);
    return arr;
  }, []);
}

// NOTE: 해쉬 사용
