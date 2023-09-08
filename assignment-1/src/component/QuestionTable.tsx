import { Complexity, Question } from "../model/Question";

interface Props {
  data: string
}

function ComplexityMapper(value: Complexity) {
  if (value === Complexity.Easy) {
    return 'Easy';
  } else if (value === Complexity.Medium) {
    return 'Medium';
  } else {
    // Default Case for now
    return 'Hard'
  }
}

const QuestionTable: React.FC<Props> = ({ data }) => {
  let questionList = JSON.parse(data);
  return (
    <table className='question-table'>
      <tbody>
        <tr>
          <th className="question-th">Id</th>
          <th className="question-th">Title</th>
          <th className="question-th">Categories</th>
          <th className="question-th">Complexity</th>
          <th className="question-th">Link</th>
        </tr>
        {questionList.map((qn: Question, key: number) => {
          let categoryString = qn.categories.map((cat) => cat).join(", ");
          return (
            <tr className="question-tr" key={key} >
              <td>{qn.id.toString()}</td>
              <td>{qn.title}</td>
              <td>{categoryString}</td>
              <td>{ComplexityMapper(qn.complexity)}</td>
              <td>{qn.link}</td>
            </tr>
          );
        })}
      </tbody>
    </table >
  );
}

export default QuestionTable;