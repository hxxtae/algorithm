process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const [a, b] = data.split(' ');
    console.log(Array.from({length: b}, () => '*'.repeat(a)).join('\n'));
});
