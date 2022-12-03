class Question {
    /**
     * 
     * @param {string} text Esto es el texto de la pregunta
     * @param {string[]} choices Estas son las opciones de la pregunta
     * @param {string} answer Esta es la respuesta de la pregunta
     */

    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    /**
     * 
     * @param {string} choice Elección 
     * @returns {boolean} Devuelve true si la respuesta es correcta
     */
    correctAnswer(choice) {
        return choice === this.answer;
    }
}

export {Question};



