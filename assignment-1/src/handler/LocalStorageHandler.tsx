import { Question, questionString } from "../model/Question";

class LocalStorageHandler {

  static saveQuestion(qnArr: questionString[]) {
    // qnArr.map(qn => (localStorage.setItem("Questions", qnArr)))
    window.localStorage.setItem("Questions", JSON.stringify(qnArr));
  }

  static loadQuestion() {
    return JSON.parse(window.localStorage.getItem("Questions") || '{}');
  }

}

export default LocalStorageHandler;