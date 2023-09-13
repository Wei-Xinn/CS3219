import './QuestionPage.css';
import { useEffect, useState } from 'react';
import QuestionTable from '../component/Question/QuestionTable';
import { questionSet } from '../GlobalData';
import { Button } from '@mui/material';
import AddQuestionModal from '../component/Question/AddQuestionModal/AddQuestionModal';
import { questionString } from '../model/Question';
import QuestionValidator from '../model/QuestionValidator';

const QuestionPage = () => {

  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [questions, setQuestions] = useState<questionString[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [newComplexity, setNewComplexity] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLink, setNewLink] = useState('');

  function openModal() {
    setModalIsVisible(true);
  }

  function closeModal() {
    setModalIsVisible(false);
  }

  function submitHandler() {
    const newQnStr = {
      id: '1',
      title: newTitle,
      complexity: newComplexity,
      categories: newCategories,
      link: newLink
    };

    // Invalid question string guard clause
    let validator = new QuestionValidator();
    if (!validator.validate(newQnStr)) {
      return;
    }

    setQuestions(arr => [...arr, newQnStr]);
    setModalIsVisible(false);
  }

  useEffect(() => {
    setQuestions(questionSet);
  }, [])

  return (
    <div id='question-page-container'>
      <AddQuestionModal
        isVisible={modalIsVisible}
        closeHandler={closeModal}
        titleSetter={setNewTitle}
        linkSetter={setNewLink}
        categoriesSetter={setNewCategories}
        complexitySetter={setNewComplexity}
        descriptionSetter={setNewDescription}
        submitHandler={submitHandler}
      />
      <div style={{ width: '50%' }}>
        <div id='button-container'>
          <Button id='add-btn' variant='contained' onClick={openModal}>Add</Button>
          <Button id='delete-btn' variant='contained' color='error'>Delete</Button>
        </div>
        <QuestionTable data={questions} />
      </div>
    </div>

  )
};

export default QuestionPage;