// 풀이 1
function solution(relation) {
  let lists = []; // 길이별 조합 리스트 배열
  const uniqueList = []; // 유일성 조합 리스트 배열
  const colLen = relation[0].length;
  const rowLen = relation.length;
  // 조합 경우의 수
  const dfs = (list, deep, end) => {
    if(list.length === end) {            
      lists.push([...list]);
      return;
    }
    for(let i = deep; i < colLen; i++) {
      list.push(i);
      dfs(list, i + 1, end);
      list.pop();
    }
  }
  for(let n = 1; n <= colLen; n++) {
    // 길이별 조합 리스트
    dfs([], 0, n);
    // 유일성 조합 리스트
    const uniqueArr = checkUniqueness(lists, relation, rowLen);
    if(uniqueArr.length) uniqueList.push(...uniqueArr);
    lists = [];
  }
  // 최소성 조합 리스트
  const minimalList = checkMinimality(uniqueList);
  return minimalList.length;
}

// 유일성 필터링 함수
function checkUniqueness(lists, relation, rowLen) {
  const uniqueList = [];
  let set = new Set();
  for(const cols of lists) {
    for(let r = 0; r < rowLen; r++) {
      const tuple = Array.from(cols, (v) => relation[r][v]);
      set.add(tuple.join(''));
    }
    if(set.size === rowLen) uniqueList.push(cols.join(''));
    set = new Set();
  }
  return uniqueList;
}

// 최소성 필터링 함수
function checkMinimality(_uniqueList) {
  const minimalList = [];
  while(_uniqueList.length) {
    const listStr = _uniqueList.shift();
    minimalList.push(listStr);
      
    const checkStr = new RegExp(`[${listStr}]`, 'g');
    const checkLen = listStr.length;
    _uniqueList = _uniqueList.filter((list) => {
      const matchLen = list.match(checkStr)?.length || 0;
      return matchLen !== checkLen;
    });        
  }
  return minimalList;
}

// NOTE: DFS / 조합

// [접근]
// 1부터 테이블 컬럼 수 n 까지 즉, 1자리 조합의 개수 부터 n자리 조합의 모든 조합 중에서
// 유일성을 가지는 조합의 목록을 구한 뒤
// 유일성 중 최소성을 만족하는 목록의 개수가 후보키로 만들 수 있는 개수가 됩니다.


// 풀이 2
function solution(relation) {
  const cols = relation[0].length
  const rows = relation.length
  const sets = 1 << cols
  const sk = new Set()

  for (let i=1; i<sets; i++) {
      const tmp = new Set()
      for (let row=0; row<rows; row++) {
          let key = ''
          for (let col=0; col<cols; col++) {
              if (i & (1 << col)) key = String(key) + String(relation[row][col])
          }
          tmp.add(key)
      }
      if (tmp.size === rows) sk.add(i)
  }

  for (let i of sk) {
      for (let j of sk) {
          if (i >= j) continue
          if ((i & j) === i) sk.delete(j)
      }
  }

  console.log(Array.from(sk).map(e => e.toString(2)))

  return sk.size
}

// NOTE: 비트연산자 활용