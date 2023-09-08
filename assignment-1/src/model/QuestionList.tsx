import { Question } from "./Question";

class QuestionList {
  questions: Question[];

  constructor() {
    this.questions = [];
  }

  public getLength() {
    return this.questions.length;
  }

  public loadData(data: Question[]) {
    this.questions = data;
  }

  public addQuestion(question: Question) {
    // TODO: Validation
    this.questions.push(question);
  }

  public deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}

export default QuestionList;