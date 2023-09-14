import { Question, questionString } from "../../model/Question";
import { useEffect, useState } from "react";
import './QuestionTable.css'

interface Props {
  data: questionString[]
  viewDescriptionHandler: (id: string) => void;
}

const headerCell = (label: string) => {
  return <th className="question-th">{label}</th>
}

const bodyCell = (value: string) => {
  return <td className="question-td">{value}</td>
}

const QuestionTable: React.FC<Props> = ({ data, viewDescriptionHandler }) => {
  const [questionsList, setQuestionsList] = useState<Question[]>([]);

  useEffect(() => {
    const qnArr = data.map((i: questionString) =>
      new Question(parseInt(i.id), i.title, i.categories,
        i.complexity, i.link));
    setQuestionsList(qnArr);
  }, [data])

  return (
    <div id='question-table-container'>
      <table className='question-table'>
        <tbody>
          <tr>
            {headerCell("Id")}
            {headerCell("Title")}
            {headerCell("Category")}
            {headerCell("Complexity")}
            {headerCell("Link")}
          </tr>
          {questionsList.map((qn: Question, key: number) => {
            return (
              <tr className="question-tr" key={qn.id.toString()} onClick={(e) => viewDescriptionHandler(qn.id.toString())}>
                {bodyCell(qn.id.toString())}
                {bodyCell(qn.title)}
                {bodyCell(qn.getCategoriesString())}
                {bodyCell(qn.getComplexityString())}
                {bodyCell(qn.link)}
              </tr>
            );
          })}
        </tbody>
      </table >
    </div>
  );
}

export default QuestionTable;