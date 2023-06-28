import loader from '../../../assets/img/XOsX.gif'
import s from './GradeModalFom.module.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react';

class ModalForm extends React.Component {
  state = {
    gradeValue: this.props.gradeValue,
    error: null,
    comment: this.props.commentValue,
  }

  containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str);
  }
  gradeChange = (e) => {
    const value = e.currentTarget.value
    if(value >= 0 && value <=100 && (this.containsOnlyNumbers(value) || value==='')) {
      this.setState({
        gradeValue: e.currentTarget.value,
        error: null,
      })
    } else {
      this.setState({
        error: "Оцінка від 0 до 100",
      })
    }
  }
  commentChange = (e) => {
    this.setState({
      comment: e.currentTarget.value,
      error: null,
    })
  }

  buttonSendData = () => {
    this.props.setNewGrade(
      this.props.groupName, 
      this.props.studentName,
      this.props.subject, 
      this.props.dateMonth,
      this.props.dateNum, 
      this.state.gradeValue,
      this.state.comment,
    )
  }

  modalDate = new Date(2022, this.props.dateMonth-1, this.props.dateNum).toLocaleString("ua", { month: "long", day: "numeric"})

  render() {
    return (
      <Modal
        show={this.props.modalIsOpen}
        onHide={() => this.props.setModalIsOpen(false)}
        centered={true}
      >
        <ModalHeader closeButton>
          <ModalTitle>Оцінка</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {this.props.modalIsFetching ? (
            <img src={loader} className={s.loader} />
          ) : (
            <Form.Group>
              <Form.Label className={s.form_label}>
                <>
                  <div className={s.modal_main_info}>
                    <div>{this.props.groupName}</div>
                    <div className={s.modalDate}>{this.modalDate}</div>
                    <div>{this.props.subject}</div>
                  </div>
                  <div className={s.modal_form_student_name}>{this.props.studentName}</div>
                </>
              </Form.Label>
              <div className={s.modal_form_inputs}>
                <div className={`${s.modal_form_input_wrap} ${s.modal_form_grade}`}>
                  <Form.Control
                    type="text"
                    onChange={this.gradeChange}
                    value={this.state.gradeValue}
                    placeholder="Оцінка ..."
                    autoFocus={true}
                  />
                  <div className={s.error_grade}>{this.state.error}</div>
                </div>
                <div className={s.modal_form_input_wrap}>
                  <Form.Control
                    type="text"
                    onChange={this.commentChange}
                    value={this.state.comment}
                    placeholder="Коментарі ..."
                  />
                </div>
              </div>
            </Form.Group>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={this.buttonSendData}
            disabled={this.props.modalIsFetching}
          >
            {this.props.modalIsFetching ? "Загрузка..." : "Відправити"}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalForm;