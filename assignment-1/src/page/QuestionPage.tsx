import './QuestionPage.css';
import React, { useEffect, useState } from 'react';
import QuestionTable from '../component/Question/QuestionTable';
import { questionSet } from '../MockData';
import { Button } from '@mui/material';
import AddQuestionModal from '../component/Question/AddQuestionModal/AddQuestionModal';
import { QuestionString } from '../model/Question';
import ViewDescriptionModal from '../component/Question/ViewDescriptionModal/ViewDescriptionModal';
import LocalStorageHandler from '../handler/LocalStorageHandler';
import QuestionStringBuilder from '../model/QuestionStringBuilder';

let qn = { title: '', category: '', complexity: '', description: '' };

const QuestionPage = () => {

  const [addModalIsVisible, setAddModalIsVisible] = useState(false);
  const [viewModalIsVisible, setViewModalIsVisible] = useState(false);
  const [questions, setQuestions] = useState<QuestionString[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategories, setNewCategories] = useState('');
  const [newComplexity, setNewComplexity] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLink, setNewLink] = useState('');
  const [currentQuestionId, setCurrentQuestionId] = useState('0');
  const [isDeleting, setIsDeleting] = useState(false);

  function closeViewModal() {
    setViewModalIsVisible(false);
  }

  function submitHandler() {
    let builder = new QuestionStringBuilder();
    builder.setId(LocalStorageHandler.getNextQuestionId()); //TODO get ID from mongodb
    builder.setTitle(newTitle);
    builder.setComplexity(newComplexity);
    builder.setCategories(newCategories);
    builder.setLink(newLink);
    builder.setDescription(newDescription);

    let newArr = questions;
    try {
      newArr = [...questions, builder.build()];
      setQuestions(newArr);
      setAddModalIsVisible(false);
      LocalStorageHandler.saveQuestion(newArr);
    } catch (e) {
      console.log(e);
      return;
    }

  }

  useEffect(() => {
    if (Object.keys(LocalStorageHandler.loadQuestion()).length === 0) {
      setQuestions(questionSet);
      return;
    }
    setQuestions(LocalStorageHandler.loadQuestion());
  }, []);

  function viewDescriptionHandler(id: string) {
    setCurrentQuestionId(id);
    setViewModalIsVisible(true);
  }

  const selectedQuestion = questions.filter(i => i.id === currentQuestionId)[0];
  if (selectedQuestion !== undefined) {
    qn.title = (selectedQuestion.title);
    qn.category = (selectedQuestion.categories);
    qn.complexity = (selectedQuestion.complexity);
    qn.description = (selectedQuestion.description);
  }

  return (
    <div id='question-page-container'>
      <AddQuestionModal
        isVisible={addModalIsVisible} closeHandler={() => setAddModalIsVisible(false)}
        titleSetter={setNewTitle} linkSetter={setNewLink}
        categoriesSetter={setNewCategories} complexitySetter={setNewComplexity}
        descriptionSetter={setNewDescription} submitHandler={submitHandler}
      />
      <ViewDescriptionModal
        isVisible={viewModalIsVisible} title={qn.title}
        category={qn.category} complexity={qn.complexity}
        description={qn.description} closeHandler={closeViewModal}
      />
      <div style={{ width: '50%' }}>
        <div id='button-container'>
          <Button id='add-btn' variant='contained' onClick={() => setAddModalIsVisible(true)}>
            Add
          </Button>
          <Button id='delete-btn' variant='contained' color='error'
            onClick={() => setIsDeleting(!isDeleting)}>
            Delete
          </Button>
        </div>
        <QuestionTable
          data={questions}
          viewDescriptionHandler={viewDescriptionHandler}
          deleteHandler={(id: string) => {
            setQuestions(questions.filter(i => i.id !== id));
            LocalStorageHandler.saveQuestion(questions.filter(i => i.id !== id));
          }}
          isDeleting={isDeleting} />
      </div>
    </div>

  )
};

export default QuestionPage;