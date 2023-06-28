import s from './GroupManager.module.css';
import Group from './Groups';
import loader from '../../assets/img/XOsX.gif';
import SubjectModalForm from './SubjectModalForm/SubjectModalForm';
import React from 'react';

class GroupManager extends React.Component {
  state = {
    groupName: null,
  }


  clickAddSubject = (groupName) => {
    this.props.setSubjectModalForm(true)
    this.setState({
      ...this.state,
      groupName
    })
  }
  
  render() {
    return (
      <div className={s.group_manager_wrap}>
      <div class={s.header_group_manager}>
          <h1>
            Список груп
          </h1>
          {!this.props.isFetching && (
            <button disabled={true}>
              <i class="fa-solid fa-plus fa-l"></i> Додати нову групу
            </button>
          )}
        </div>
  
        {this.props.isFetching ? (
          <img src={loader} className={s.group_loader}/>
        ) : (
          <div className={s.groups_list}>
            {this.props.groups.map(group => {
              return (
                <Group 
                  groupName={group.groupName}
                  students={group.students}
                  subjects={group.subjects}
                  clickAddSubject={this.clickAddSubject}
                />
              )
            })}
          </div>
        )}
        {this.props.subjectModalForm && (
          <SubjectModalForm
            groupName={this.state.groupName}
            subjectModalForm={this.props.subjectModalForm}
            subjectIsFetching={this.props.subjectIsFetching}
            addNewSubject={this.props.addNewSubject}
            setSubjectModalForm={this.props.setSubjectModalForm}
          />
        )}
      </div>
    )
  }
}

 export default GroupManager;