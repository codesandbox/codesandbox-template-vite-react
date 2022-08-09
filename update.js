
import fs from 'fs/promises';

let counter = 0;
async function editAppTsx() {
    const fileContent = await fs.readFile('src/App.tsx', 'utf-8');
    const newContent =fileContent.replace(/Counter to edit.*/, `Counter to edit: ${counter}`)
    console.log('Updating counter to edit', counter);
    fs.writeFile('src/App.tsx', newContent);
    counter ++;
}

setInterval(() => {
    editAppTsx();
}, 1000)