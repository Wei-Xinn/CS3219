enum Category {
  "Strings",
  "Data Structures",
  "Algorithms"
}

enum Complexity {
  "Easy",
  "Medium",
  "Hard"
}

interface questionString {
  id: string,
  title: string,
  complexity: string,
  categories: string,
  description: string,
  link: string
}

function parseCategories(inputString: string) {
  return inputString.split(',')
    .map((c) => Category[c.trim() as keyof typeof Category]);
}

function parseComplexity(inputString: string) {
  return Complexity[inputString as keyof typeof Complexity];
}

class Question {
  id: Number;
  title: string;
  categories: Category[];
  complexity: Complexity;
  link: string;
  description: string;

  constructor(id: Number, title: string, categories: string, complexity: string, link: string, description: string) {
    this.id = id;
    this.title = title;
    this.categories = parseCategories(categories);
    this.complexity = parseComplexity(complexity);
    this.link = link;
    this.description = description;
  }

  public getCategoriesString() {
    return this.categories.map((c) => Category[c]).join(', ');
  }

  public getComplexityString() {
    return Complexity[this.complexity];
  }

}

export { Question, Category, Complexity };
export type { questionString };

