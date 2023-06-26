import React from 'react';
import { connect } from 'react-redux';
import Gradebook from './Gradebook';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getGroups, setGroupName, setSubject, setNewGrade, setMonth } from '../../redux/gradebookReducer';
import loader from '../../assets/img/XOsX.gif'
import s from './Gradebook.module.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'


class GradebookContainer extends React.Component {
  componentDidMount() {
    this.props.getGroups();
  }

  state = {
    isOpen: false,
    dateNum: null,
    //new Date().getMonth()+1,
    gradeValue: "",
    studentName: null,
  }

  setModalIsOpen = (isOpen) => {
    this.setState({
      isOpen
    })
  }

  clickGrade = (studentName, dateNum, gradeValue) => {
    this.setModalIsOpen(true);
    this.setState({
      studentName,
      dateNum,
      gradeValue
    })
    
  }

  render() {
    return (
      <>
        <Gradebook {...this.props} {...this.state} setModalIsOpen={this.setModalIsOpen} clickGrade={this.clickGrade} />

        <button onClick={() => {this.setModalIsOpen(true)}}>Display Modal Form</button>
        {this.state.isOpen && (
          <ModalForm
            setModalIsOpen={this.setModalIsOpen}
            {...this.state}
            groupName={this.props.groupName}
            subject={this.props.subject}
            setNewGrade={this.props.setNewGrade}
            modalIsFetching={this.props.modalIsFetching}
          />
        )}
      </>
    );
  }
}


class ModalForm extends React.Component {
  state = {
    gradeValue: this.props.gradeValue,
    error: null,
  }

  gradeChange = (e) => {
    const value = e.currentTarget.value
    console.log(value)
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

  containsOnlyNumbers = (str) => {
    return /^\d+$/.test(str);
  }

  render() {
    return (
      <Modal
        show={this.props.isOpen}
        onHide={() => this.props.setModalIsOpen(false)}
      >
        <ModalHeader closeButton>
          <ModalTitle>Оцінка</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {this.props.modalIsFetching ? (
            <img src={loader} className={s.loader}/>
          ) : (
            <Form.Group>
              <Form.Label>
                {this.props.subject}: {this.props.studentName} - {this.props.dateNum}.
                {this.props.dateMonth}
              </Form.Label>
              <Form.Control
                type="text"
                onChange={this.gradeChange}
                value={this.state.gradeValue}
                placeholder="Grade ..."
                autoFocus={true}
              />
              <div className={s.error_grade}>{this.state.error}</div>
            </Form.Group>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            onClick={() => {
                this.props.setNewGrade(
                  this.props.groupName, 
                  this.props.studentName,
                  this.props.subject, 
                  this.props.dateMonth,
                  this.props.dateNum, 
                  this.state.gradeValue
                ).then(() => {
                  this.props.setModalIsOpen(false)
                })
              }
            }
            disabled={this.props.modalIsFetching}
          >
            {this.props.modalIsFetching ? (
              "Загрузка..."
            ) : (
              "Відправити"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    groupsNameList: state.gradebook.groupsNameList,
    subjectsList: state.gradebook.subjectsList,
    groupName: state.gradebook.groupName,
    students: state.gradebook.students,
    modalIsFetching: state.gradebook.modalIsFetching,
    subject: state.gradebook.subject,
    dateMonth: state.gradebook.dateMonth,
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getGroups,
    setGroupName,
    setSubject,
    setNewGrade,
    setMonth
  })
)(GradebookContainer)