// @ts-check
import {questions} from './data/questions.js';
import { Quiz } from './models/Quiz.js';
import {UI} from './models/UI.js';

/**
 * 
 * @param {Quiz} quiz Objeto quiz 
 * @param {UI} ui Objeto UI 
 */
const renderPage = (quiz, ui) => {

    if (quiz.isFinished()) {
        ui.showScores(quiz.score);
    } else {
        ui.showQuestion(quiz.getQuestionIndex().text);
        ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
        ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
            quiz.guess(currentChoice);
            renderPage(quiz, ui);
        });
    }
};

function main() {
    const quiz = new Quiz(questions);
    const ui = new UI();

    renderPage(quiz, ui);
}

main();
