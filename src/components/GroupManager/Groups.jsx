import React from 'react'
import s from './GroupManager.module.css'

class Group extends React.Component {
  state = {
    detailIsOpen: false,

  }

  getSum = (array) => array.reduce((a, b) => a + b, 0)

  viewGroupDetail = (detailIsOpen) => {
    return () => {
      this.setState({
        ...this.state,
        detailIsOpen: detailIsOpen
      })
    }
  }

  

  render() {
    const groupAverageGrade = Math.round(this.getSum(this.props.students.map(student => student.averageGrade)) / this.props.students.length * 100) / 100

    return (
      <div class={s.group}>
        <div class={s.group_info}>
          <div className={s.group_name}>{this.props.groupName}</div>
          <div className={s.group_average_grade}>Середній бал - {groupAverageGrade}</div>
          <div className={s.group_buttons}>
            {this.state.detailIsOpen ? (
              <button className={`${s.group_button} ${s.group_button_close}`} onClick={this.viewGroupDetail(false)}>Закрити деталі</button>
            ) : (
              <button className={s.group_button} onClick={this.viewGroupDetail(true)}>Подивитись деталі</button>
            )}
          </div>
        </div>
  
        {this.state.detailIsOpen && (
          <div className={s.group_detail}>
            <div className={s.group_detail_block}>
              <div className={s.group_detail_block_header}>
                Студенти {this.props.groupName}
              </div>
              
              {/* students */}
              {this.props.students.map(student => {
                return (
                  <div className={s.group_detail_item}>
                    <div className={s.group_detail_item_name}>
                      {student.fullName}
                    </div>
                    <div className={s.group_detail_student_average_grade}>{student.averageGrade}</div>
                  </div>
                )
              })}
            </div>

            <div className={s.group_detail_block}>
              <div className={s.group_detail_block_header}>
                Предмети {this.props.groupName}
                <button className={s.group_detail_button} onClick={() => this.props.clickAddSubject(this.props.groupName)}>
                  <i className="fa-solid fa-plus fa-l"></i> Додати предмет
                </button>
              </div>

              {/* subjects */}
              {this.props.subjects.map(subject => {
                return (
                  <div className={s.group_detail_item}>
                    <div className={s.group_detail_item_name}>{subject}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}


export default Group;