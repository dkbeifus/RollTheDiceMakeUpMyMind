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

async function rollDice(textarea, choice_field) {
    if (textarea.value.split('\n').filter(item => item.trim() !== '').length > 0 ){
        textarea.style.backgroundColor = 'purple';
        textarea.style.color = ' rgb(250, 246, 233)';
        for (let i = 0; i < 50; i++){
            await sleep(50); //50 ms pause
            shuffleItems(textarea);
        }
        let lines = textarea.value.split('\n').filter(item => item.trim() !== '');
        if (lines.length > 0 ){
            let i = Math.floor(Math.random() * (lines.length));
            choice_field.value = "The Dice Chose: " + lines[i];
            textarea.style.backgroundColor = ' rgb(250, 246, 233)';
            textarea.style.color = 'black';
        }
    }
}

async function saveListAsFile(textarea){
    const text = textarea.value; 
    const blob = new Blob([text], { type: 'text/plain' });
    //Both parts of the if statement have been chosen to ensure a saveas dialog appears.
    if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({suggestedName: 'RollTheDiceList.txt', types: [{description: 'Text Files', accept: { 'text/plain': ['.txt'] },},]});
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
    } else {
        //For Firefox and other browsers that do not support showSaveFilePicker()
        let filename = "RollTheDiceList.txt";
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }    
}

async function importListFromFile(textarea, file_input_element){
    file_input_element.addEventListener('change', function () {
        let reader = new FileReader(); 
        reader.onload = function () {textarea.value = reader.result;}
        reader.readAsText(this.files[0]);
    })
    file_input_element.click()
}