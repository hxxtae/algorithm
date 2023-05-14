function solution(user_id, banned_id) {
  const uLen = user_id.length;
  const bLen = banned_id.length;
  const visited = Array(uLen).fill(0);
  const bannedId = banned_id.map((id) => id.replace(/\*/g, '\\w'));
  const matchId = (user, banned) => {
    const reg = new RegExp(`^${banned}$`);
    return reg.test(user);
  }
  let countArr = new Set();
  
  const dfs = (deep) => {
    if(deep === bLen) {
      // [1, 2, 3, 4] 와 [1, 2, 4, 3] 의 경우 때문에, 중복 제거를 위해 정렬하여 Set에 포함시킨다.
      const list = visited.reduce((arr, n, idx) => (n === 1 && arr.push(idx), arr), []);
      const listStr = list.sort((a, b) => a - b).join('');
      countArr.add(listStr);
      return;
    }
    for(let i = 0; i < uLen; i++) {
      if(visited[i]) continue;
      const id = user_id[i];
      if(!matchId(id, bannedId[deep])) continue;
      visited[i] = 1;
      dfs(deep + 1);
      visited[i] = 0;
    }
  }
  dfs(0);
  return countArr.size;
}

// NOTE: DFS