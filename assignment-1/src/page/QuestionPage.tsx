import './QuestionPage.css';
import QuestionTable from '../component/Question/QuestionTable';
import { questionSet } from '../data';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';

const QuestionPage = () => {

  return (
    <div id='question-page-container'>
      <div style={{ width: '50%' }}>
        <div id='button-container'>
          <Modal
            open={true}
            onClose={() => { }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <h1>asdfsadf</h1>
          </Modal>
          <Button id='add-btn' variant='contained'>Add</Button>
          <Button id='delete-btn' variant='contained' color='error'>Delete</Button>
        </div>
        <QuestionTable data={questionSet} />
      </div>
    </div>

  )
};

export default QuestionPage;