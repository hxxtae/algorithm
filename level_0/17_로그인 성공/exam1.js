function solution(id_pw, db) {
  const [id, pw] = id_pw;
  for(let i = 0, len = db.length; i < len; i++) {
    const [db_id, db_pw] = db[i];
    if(db_id === id) return db_pw === pw ? 'login' : 'wrong pw';
  }
  return 'fail';
}

// NOTE: 문제 구현 능력