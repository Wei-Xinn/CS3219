import './QuestionPage.css';
import React, { useEffect, useState } from 'react';
import QuestionTable from '../component/Question/QuestionTable';
import { questionSet } from '../MockData';
import { Button } from '@mui/material';
import AddQuestionModal from '../component/Question/AddQuestionModal/AddQuestionModal';
import { questionString } from '../model/Question';
import QuestionValidator from '../model/QuestionValidator';
import ViewDescriptionModal from '../component/Question/ViewDescriptionModal/ViewDescriptionModal';

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<questionString[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [newComplexity, setNewComplexity] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLink, setNewLink] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState('0');

  function openAddModal() {
    setAddModalIsVisible(true);
  }

  function closeAddModal() {
    setAddModalIsVisible(false);
  }

  function closeViewModal() {
    setViewModalIsVisible(false);
  }

  function submitHandler() {
    const newQnStr = {
      id: '1',
      title: newTitle,
      complexity: newComplexity,
      categories: newCategories,
      link: newLink,
      description: newDescription
    };

    // Invalid question string guard clause
    let validator = new QuestionValidator();
    if (!validator.validate(newQnStr)) {
      return;
    }

    setQuestions(arr => [...arr, newQnStr]);
    setAddModalIsVisible(false);
  }

  useEffect(() => {
    setQuestions(questionSet);
  }, []);

  function viewDescriptionHandler(id: string) {
    setCurrentQuestionId(id);
    setViewModalIsVisible(true);
  }

  let qn = { title: '', category: '', complexity: '', description: '' };
  if (questions.filter(i => i.id === currentQuestionId)[0] !== undefined) {
    qn.title = (questions.filter(i => i.id === currentQuestionId)[0].title);
    qn.category = (questions.filter(i => i.id === currentQuestionId)[0].categories);
    qn.complexity = (questions.filter(i => i.id === currentQuestionId)[0].complexity);
    qn.description = (questions.filter(i => i.id === currentQuestionId)[0].description);
  }

  return (
    <div id='question-page-container'>
      <AddQuestionModal
        isVisible={addModalIsVisible}
        closeHandler={closeAddModal}
        titleSetter={setNewTitle}
        linkSetter={setNewLink}
        categoriesSetter={setNewCategories}
        complexitySetter={setNewComplexity}
        descriptionSetter={setNewDescription}
        submitHandler={submitHandler}
      />
      <ViewDescriptionModal
        isVisible={viewModalIsVisible}
        title={qn.title}
        category={qn.category}
        complexity={qn.complexity}
        description={qn.description}
        closeHandler={closeViewModal}
      />
      <div style={{ width: '50%' }}>
        <div id='button-container'>
          <Button id='add-btn' variant='contained' onClick={openAddModal}>Add</Button>
          <Button id='delete-btn' variant='contained' color='error'>Delete</Button>
        </div>
        <QuestionTable data={questions} viewDescriptionHandler={viewDescriptionHandler} />
      </div>
    </div>

  )
};

export default QuestionPage;