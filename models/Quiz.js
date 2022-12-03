// @ts-check
import {Question} from "./Question.js";

export class Quiz {
    questionIndex = 0;
    score = 0;
    
    /**
     * 
     * @param {Question[]} questions  
     */
    constructor(questions) {
        this.questions = questions;
    }

    /**
     * 
     * @returns {Question} la respuesta encontrada
     */
    //Para saber en que pregunta estamos
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    isFinished() {
       return this.questions.length === this.questionIndex; 
    }

    /**
     * 
     * @param {string} answer texto
     */
    //Contador para las preguntas acertadas
    guess(answer) {
        if(this.getQuestionIndex().correctAnswer(answer)) {
            this.score++;
        } 
        this.questionIndex++;           
    }
}