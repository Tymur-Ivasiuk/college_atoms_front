import loader from '../../../assets/img/XOsX.gif'
import s from './SubjectModalForm.module.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react';

class SubjectModalForm extends React.Component {
  state = {
    subject: null,
  }

  subjectChange = (e) => {
    this.setState({
      subject: e.currentTarget.value,
    })
  }

  buttonSendData = () => {
    this.props.addNewSubject(
      this.props.groupName, 
      this.state.subject,
    )
  }

  render() {
    return (
      <Modal
        show={this.props.subjectModalForm}
        onHide={() => this.props.setSubjectModalForm(false)}
        centered={true}
      >
        <ModalHeader closeButton>
          <ModalTitle>Додати предмет</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {this.props.subjectIsFetching ? (
            <img src={loader} className={s.loader} />
          ) : (
            <Form.Group>
              <Form.Label className={s.form_label}>
                <>
                  <div className={s.modal_form_group_name}>{this.props.groupName}</div>
                </>
              </Form.Label>
              <div className={s.modal_form_inputs}>
                <div className={s.modal_form_input_wrap}>
                  <Form.Control
                    type="text"
                    onChange={this.subjectChange}
                    value={this.state.subject}
                    placeholder="Введіть назву предмету ..."
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
            disabled={this.props.subjectIsFetching}
          >
            {this.props.subjectIsFetching ? "Загрузка..." : "Відправити"}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SubjectModalForm;