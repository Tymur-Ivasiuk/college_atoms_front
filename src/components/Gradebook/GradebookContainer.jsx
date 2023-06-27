import React from 'react';
import { connect } from 'react-redux';
import Gradebook from './Gradebook';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getGroups, setGroupName, setSubject, setNewGrade, setMonth, setModalIsOpen } from '../../redux/gradebookReducer';
import ModalForm from './GradeModalForm/GradeModalForm';

class GradebookContainer extends React.Component {
  componentDidMount() {
    this.props.getGroups();
  }

  state = {
    dateNum: null,
    gradeValue: "",
    commentValue: "",
    studentName: null,
  }

  clickGrade = (studentName, dateNum, gradeValue, commentValue) => {
    this.props.setModalIsOpen(true);
    this.setState({
      studentName,
      dateNum,
      gradeValue,
      commentValue
    })
    
  }

  render() {
    return (
      <>
        <Gradebook {...this.props} {...this.state} clickGrade={this.clickGrade} />

        {this.props.modalIsOpen && (
          <ModalForm
            modalIsOpen={this.props.modalIsOpen}
            setModalIsOpen={this.props.setModalIsOpen}
            {...this.state}
            dateMonth={this.props.dateMonth}
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


const mapStateToProps = (state) => {
  return {
    groupsNameList: state.gradebook.groupsNameList,
    subjectsList: state.gradebook.subjectsList,
    groupName: state.gradebook.groupName,
    students: state.gradebook.students,
    modalIsFetching: state.gradebook.modalIsFetching,
    subject: state.gradebook.subject,
    dateMonth: state.gradebook.dateMonth,
    modalIsOpen: state.gradebook.modalIsOpen,
  }
}

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getGroups,
    setGroupName,
    setSubject,
    setNewGrade,
    setMonth,
    setModalIsOpen
  })
)(GradebookContainer)