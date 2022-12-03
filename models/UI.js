export class UI {
    constructor() {

    }

    /**
     * 
     * @param {string} text Para mostrar las preguntas 
     */
    showQuestion(text) {
        const questionTitle = document.getElementById('question');
        questionTitle.innerText = text;
    }

    /**
     * 
     * @param {string[]} choices Para mostrar las opciones 
     */
    showChoices(choices, callback) {
        const choicesC = document.getElementById('choices');
        choicesC.innerHTML = "";

        for (let i = 0; i < choices.length; i++) {
           const button = document.createElement('button');
           button.addEventListener('click', () => callback(choices[i]));
           button.innerText = choices[i];
           button.className = 'button';
           
           choicesC.append(button);
        }
    }

    showScores(score) {
        const gameOverHTML = `
          <h1>Result</h1>
          <h2 id="score">Your scores: ${score}</h2>
          <button class="btnInicio" onclick="window.location.href='./index.html'">Inicio</button>
          `;
        // <h2 id="score">Your scores: ${quiz.score}</h2>
    
        const element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    }

    showProgress(currentIndex, total) {
        var element = document.getElementById("progress");
        element.innerHTML = `Question ${currentIndex} of ${total}`;
    }
}