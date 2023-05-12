// 1. 이전 풀이
function solution1(genres, plays) {
  const genNames = [];
  const rankGenArr = [];
  const playObj = [];

  genres.forEach((gen, idx) => {
    const chk = genNames.includes(gen);
    if (chk) {
      const genIdx = genNames.indexOf(gen);
      rankGenArr[genIdx][1] += plays[idx];
      playObj[genIdx].push({
        cnt: plays[idx],
        id: idx
      });
      
    } else {
      genNames.push(gen);
      rankGenArr.push([gen, plays[idx], rankGenArr.length]);
      playObj.push([{
        cnt: plays[idx],
        id: idx
      }]);
    }
  });

  const resultArr = [];
  rankGenArr.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < genNames.length; i++) {
    const list = playObj[i];
    list.sort((a, b) => {
      if (b.cnt === a.cnt) {
        return a.id - b.id;
      } else {
        return b.cnt - a.cnt;
      }
    });
  }
  
  for (let i = 0; i < genNames.length; i++) {
    const genIdx = rankGenArr[i][2];
    const objList = playObj[genIdx];
    if(objList.length > 1) {
      resultArr.push(objList[0].id);
      resultArr.push(objList[1].id);
    } else {
      resultArr.push(objList[0].id);
    }
  }

  return resultArr;
}

// 2. 새롭게 풀이
function solution2(genres, plays) {
    const result = [];
    const len = genres.length;
    
    // 장르별 총 재생 횟수 및 정렬
    let genrePlay = new Map();
    for(let i = 0; i < len; i++) {
      const [genre, play] = [genres[i], plays[i]];
      genrePlay.set(genre, (genrePlay.get(genre) ?? 0) + play);
    }
    genrePlay = [...genrePlay].sort((a, b) => b[1] - a[1]);
    
    // 장르에 포함된 노래 객체 및 정렬
    const data = genres.map((genre, idx) => [genre, {
      id: idx,
      play: plays[idx],
    }]);
    const map = data.reduce((prev, curr) => 
      (prev.set(curr[0], [...(prev.get(curr[0]) || []), curr[1]]), prev), new Map());
    for(let [_, arr] of map) {
      arr.sort((a, b) => {
        if(b.play === a.play) return a.id - b.id;
        return b.play - a.play;
      });
    }
    
    // 정렬 순서 결과
    for(const [genre] of genrePlay) {
      const arr = map.get(genre);
      if(arr.length >= 2) {
        result.push(arr[0].id);
        result.push(arr[1].id);
      } else {
        result.push(arr[0].id);
      }
    }
    return result;
}

// NOTE: 해시