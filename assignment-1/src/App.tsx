import './App.css';
import QuestionTable from './component/QuestionTable';
import { questionSet } from './data';

function App() {
  return (
    <div className="App">
      <QuestionTable data={JSON.stringify(questionSet)} />
    </div>
  );
}

export default App;
