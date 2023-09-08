type Category = string;

// Refactor Complexity

enum Complexity {
  Easy,
  Medium,
  Hard
}

class Question {
  id: Number;
  title: string;
  categories: Category[];
  complexity: Complexity;
  link: string;
  constructor(id: Number, title: string, categories: Category[], complexity: Complexity, link: string) {
    this.id = id;
    this.title = title;
    this.categories = categories;
    this.complexity = complexity;
    this.link = link;
  }
}

export { Question, Complexity };
