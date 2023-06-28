import React from "react"
import { connect } from "react-redux"
import GroupManager from "./GroupManager"
import { getGroups, addNewSubject, setSubjectModalForm, setSubjectFetching } from "../../redux/groupManagerReducer" 

class GroupManagerContainer extends React.Component {
  componentDidMount() {
    this.props.getGroups()
  }

  render() {
    return (
      <GroupManager 
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groupManager.groups,
    isFetching: state.groupManager.isFetching,
    subjectModalForm: state.groupManager.subjectModalForm,
    subjectIsFetching: state.groupManager.subjectIsFetching,
  }
}

export default connect(mapStateToProps, {
  getGroups,
  addNewSubject,
  setSubjectModalForm,
  setSubjectFetching
})(GroupManagerContainer)