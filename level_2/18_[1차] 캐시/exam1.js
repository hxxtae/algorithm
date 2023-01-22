function solution(cacheSize, cities) {
  const cache = Array(cacheSize);
  const len = cities.length;
  let time = 0;

  if(cacheSize === 0) return len * 5;
  for(let i = 0; i < len; i++) {
    const city = cities[i].toLowerCase();
    const findCacheIdx = cache.indexOf(city);
    if(findCacheIdx === -1) {
      if(cache.length >= cacheSize) cache.shift();
        time += 5;
    } else {
      cache.splice(findCacheIdx, 1);
      time += 1;
    }
    cache.push(city);
  }
  return time;
}

// NOTE: 힙