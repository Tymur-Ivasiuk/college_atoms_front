import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import s from './Gradebook.module.css';
import Select from 'react-select';
import arrow from '../../assets/img/arrow.svg';


const Gradebook = (props) => {
  const getDaysInCurrentMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  let dateMonth = props.dateMonth
  while(dateMonth > 12 || dateMonth<=0) {
    dateMonth = Math.abs(dateMonth-12)
  }
  const date = new Date(new Date().getFullYear() ,dateMonth-1, 1)
  const groupChange = (selectedOption) => {
    props.setGroupName(selectedOption.value)
  }
  const subjectChange = (selectedOption) => {
    props.setSubject(props.groupName, selectedOption.value, dateMonth)
  }

  return (
    <>
      <div className={s.tab_info}>
        <Select
          options={props.groupsNameList.map((groupName) => ({
            label: groupName,
            value: groupName,
          }))}
          searchable={true}
          onChange={groupChange}
        />
        <Select
          options={props.subjectsList.map((subject) => ({
            label: subject,
            value: subject,
          }))}
          isDisabled={!Boolean(props.groupName)}
          onChange={subjectChange}
        />
      </div>
      <ScrollSync>
        <div className={s.table}>
          <div className={s.table_header}>
            <img src={arrow} onClick={() => props.setMonth(props.groupName, props.subject, dateMonth-1)} className={s.arrow}></img>
            {date.toLocaleString("ua", { month: "long" })}
            <img src={arrow} onClick={() => props.setMonth(props.groupName, props.subject, dateMonth+1)} className={s.arrow}></img>
          </div>
          <div className={s.table_dates}>
            <ScrollSyncPane group="horizontal">
              <div className={s.dates}>
                {Array.from(Array(getDaysInCurrentMonth(date)).keys()).map(
                  (day) => {
                    return <div className={s.date}>{day + 1}</div>;
                  }
                )}
              </div>
            </ScrollSyncPane>
          </div>
          <div className={s.table_body}>
            {props.students.map((student) => {
              return (
                <Student
                  studentsName={student.fullName}
                  clickGrade={props.clickGrade}
                  grades={student.grades}
                  getDaysInCurrentMonth={getDaysInCurrentMonth}
                />
              );
            })}
            {/* <Student
              studentsName={"Івасюк Тимур Віталійович"}
              clickGrade={props.clickGrade}
            />
            <Student
              studentsName={"Гой Владислав Іванович"}
              clickGrade={props.clickGrade}
            /> */}
          </div>
        </div>
      </ScrollSync>
    </>
  );
}


const Student = (props) => {
  return (
    <div className={s.table_row}>
      <div className={s.student_name}>{props.studentsName}</div>
      <ScrollSyncPane group="horizontal">
        <div className={s.marks}>
          {props.grades.map((mark, index) => {
            return (
              <div className={s.mark} 
                onClick={() => props.clickGrade(props.studentsName, index+1, mark)}>{mark}</div>
            )
          })}
          {/* <div class="mark"></div> */}
          
        </div>
      </ScrollSyncPane>
    </div>
  );
}

export default Gradebook;