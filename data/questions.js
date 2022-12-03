import {Question} from '../models/Question.js';
import {data} from './data.js';

//Recorre el array y retorna un nuevo array con los valores
export const questions = data.map(question => new Question(question.question, question.choices, question.answer));