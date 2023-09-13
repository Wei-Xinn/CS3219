import { questionString } from "./Question";

class QuestionValidator {
  public validate(input: questionString) {
    // check for empty fields
    if (!input.title) {
      console.log('Title cannot be empty');
      return false;
    }
    if (!input.categories) {
      console.log('Categories cannot be empty');
      return false;
    }
    if (!input.complexity) {
      console.log('Complexity cannot be empty');
      return false;
    }
    if (!input.link) {
      console.log('Link cannot be empty');
      return false
    }
    return true;
  }
}

export default QuestionValidator;