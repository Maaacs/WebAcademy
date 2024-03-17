document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('generate');
  const numberInput = document.getElementById('paragraphs');
  const resultContainer = document.getElementById('loremText');

  button.addEventListener('click', () => {
    const numberOfParagraphs = numberInput.value;
    fetch(`/lorem/${numberOfParagraphs}`)
      .then(response => response.text())
      .then(text => {
        resultContainer.innerHTML = text;
      })
      .catch(error => {
        console.error('Error fetching lorem ipsum:', error);
        resultContainer.innerHTML = '<p>Erro ao gerar o Lorem Ipsum. Tente novamente.</p>';
      });
  });
});
