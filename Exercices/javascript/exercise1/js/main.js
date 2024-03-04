document.addEventListener('DOMContentLoaded', (event) => {
    const customName = document.getElementById('customname');
    const randomize = document.querySelector('#generate');
    const story = document.getElementById('story');

    // Seleciona um valor aleatório de um array
    const randomValueFromArray = (array) => {
        const random = Math.floor(Math.random() * array.length);
        return array[random];
    };

    // Arrays com partes da história
    const insertX = ['Goku', 'Vegeta', 'Piccolo'];
    const insertY = ['a luta contra Freeza', 'o torneio de artes marciais', 'o planeta Namekusei'];
    const insertZ = ['se transformou em Super Saiyajin', 'usou o Kamehameha', 'invocou Shenlong'];

    // Cria e exibe uma nova história quando o botão é clicado
    const result = () => {
        let newStory = 'Em um dia quente de 94 fahrenheit no planeta Terra, :insertx: estava se preparando para :inserty:. Depois de um intenso treinamento, :insertz:. Todos ficaram impressionados, especialmente :insertx:, que não esperava por essa transformação.';
        
        // Substitui pelo nome personalizado
        if (customName.value !== '') {
            newStory = newStory.replace(':insertx:', customName.value);
        }

        // Substitui os espaços reservados por valores aleatórios
        const xItem = randomValueFromArray(insertX);
        const yItem = randomValueFromArray(insertY);
        const zItem = randomValueFromArray(insertZ);

        newStory = newStory.replace(':insertx:', xItem);
        newStory = newStory.replace(':inserty:', yItem);
        newStory = newStory.replace(':insertz:', zItem);


        if (document.getElementById("uk").checked) {
            const temperature = `${Math.round((94 - 32) * 5 / 9)} centigrade`; // Fahrenheit para Celsius
            newStory = newStory.replace('94 fahrenheit', temperature);
        }

        story.textContent = newStory;
        story.style.visibility = 'visible';
    };

    randomize.addEventListener('click', result);
});
