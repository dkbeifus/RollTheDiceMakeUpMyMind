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

function create_list_div(){
    const dice_tray = document.getElementById('diceTray');
    counter_element = document.getElementById('hidden_number');
    let counter = parseInt(counter_element.textContent);
    counter = counter + 1;
    counter = counter.toString();
    counter_element.textContent = counter;
    
    const newList = document.createElement('div');
    newList.classList.add('choice_area');
    
    const newListLabel = document.createElement('label');
    newListLabel.classList.add('choice_label');
    newListLabel.setAttribute('for', 'choice_list_' + counter);
    newListLabel.textContent = "Choose From These Items";
    newList.appendChild(newListLabel);
    
    const newListAnswerArea = document.createElement('textarea');
    newListAnswerArea.classList.add('choice_decision');
    newListAnswerArea.setAttribute('id', 'choice_list_' + counter + '_choice');
    newListAnswerArea.setAttribute('name', 'choice_list_' + counter);
    newListAnswerArea.setAttribute('placeholder', 'Roll To Choose');
    newListAnswerArea.setAttribute('readonly', "True" );
    newList.appendChild(newListAnswerArea);
    
    const newListTextArea = document.createElement('textarea');
    newListTextArea.classList.add('choice_list');
    newListTextArea.setAttribute('id', 'choice_list_' + counter);
    newListTextArea.setAttribute('name', 'choice_list_' + counter);
    newListTextArea.setAttribute('placeholder', 'Enter each choice on a new line');
    newList.appendChild(newListTextArea);

    const newListButtonDiv = document.createElement('div');
    newListButtonDiv.classList.add('choice_button_row');
    
    const buttonDivRoll = document.createElement('button');
    buttonDivRoll.classList.add('choice_button');
    buttonDivRoll.setAttribute('for', 'choice_list');
    buttonDivRoll.setAttribute('name', 'choice_list_' + counter);
    buttonDivRoll.setAttribute('type', 'choice_button');
    buttonDivRoll.setAttribute('id', 'button_roll_the_dice');
    buttonDivRoll.setAttribute('onclick', "rollDice(document.getElementById(this.name), document.getElementById(this.name + '_choice'))");
    buttonDivRoll.textContent = "Roll The Dice";
    newListButtonDiv.appendChild(buttonDivRoll);
    
    const buttonDivShuffle= document.createElement('button');
    buttonDivShuffle.classList.add('choice_button');
    buttonDivShuffle.setAttribute('for', 'choice_list');
    buttonDivShuffle.setAttribute('name', 'choice_list_' + counter);
    buttonDivShuffle.setAttribute('id', 'button_shuffle');
    buttonDivShuffle.setAttribute('onclick', "shuffleItems(document.getElementById(this.name))");
    buttonDivShuffle.textContent = "Shuffle Choices";
    newListButtonDiv.appendChild(buttonDivShuffle);
    
    const buttonDivImport = document.createElement('button');
    buttonDivImport.classList.add('choice_button');
      buttonDivImport.setAttribute('for', 'choice_list');
    buttonDivImport.setAttribute('name', 'choice_list_' + counter);
    buttonDivImport.setAttribute('id', 'button_import');
    buttonDivImport.setAttribute('onclick', "importListFromFile(document.getElementById(this.name), document.getElementById(this.name + '_fileInput'))");
    buttonDivImport.textContent = "Import From File";
    newListButtonDiv.appendChild(buttonDivImport);
    
    const buttonDivExport = document.createElement('button');
    buttonDivExport.classList.add('choice_button');
    buttonDivExport.setAttribute('for', 'choice_list');
    buttonDivExport.setAttribute('name', 'choice_list_' + counter);
    buttonDivExport.setAttribute('id', 'button_export');
    buttonDivExport.setAttribute('onclick', "saveListAsFile(document.getElementById(this.name))");
    buttonDivExport.textContent = "Export To File";
    newListButtonDiv.appendChild(buttonDivExport);

    const buttonDivFile = document.createElement('input');
    buttonDivFile.setAttribute('type', 'file');
    buttonDivFile.setAttribute('id', 'choice_list_' + counter + '_fileInput');
    buttonDivFile.setAttribute('accept', '.txt');
    buttonDivFile.setAttribute('style', 'display:none;');
    newListButtonDiv.appendChild(buttonDivFile);

    newList.appendChild(newListButtonDiv);
    dice_tray.appendChild(newList);
}

function removeList(){
    let visible_lists = document.querySelectorAll('[class*="choice_area"]');
    visible_lists[visible_lists.length - 1].remove();
    toggleDisableForRemove();
}

function addList() {
    create_list_div();
    toggleDisableForRemove();
}

function toggleDisableForRemove(){
    let visible_lists = document.querySelectorAll('[class*="choice_area"]');
    const removeButton = document.getElementById('remove_button');
    if (visible_lists.length == 1){
        removeButton.disabled = true;
        removeButton.style.backgroundColor = 'rgb(116, 116, 116)';
    }else{
        removeButton.disabled = false;
        removeButton.style.backgroundColor = 'beige';
    }
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
            choice_field.value = "The Dice Chose:  \n" + lines[i];
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

toggleDisableForRemove();