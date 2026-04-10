function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function shuffleItems(textarea) {
    let lines = textarea.value.split('\n').filter(item => item.trim() !== '');
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    textarea.value = lines.join('\n');
}


async function rollDice(textarea) {
    for (let i = 0; i < 50; i++){
        await sleep(50);
        shuffleItems(textarea);
    }
}