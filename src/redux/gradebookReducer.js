import { GroupApi } from "../api/api";

const SET_GROUP_NAME = "SET_GROUP_NAME";
const SET_GROUPS_NAME_LIST = "SET_GROUPS_NAME_LIST";
const SET_SUBJECTS_LIST = "SET_SUBJECTS_LIST";
const SET_STUDENTS_NAMES = "SET_STUDENTS_NAMES";
const SET_SUBJECT = "SET_SUBJECT";
const TOGGLE_MODAL_IS_FETCHING = "TOGGLE_MODAL_IS_FETCHING";
const SET_DATE_MONTH = "SET_DATE_MONTH";
const SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN";
const CLEAR_STUDENTS_GRADES = "CLEAR_STUDENTS_GRADES";

let initialState = {
  groupsNameList: [],
  subjectsList: [],
  students: [], //{fullName: "Tymur", grades: Array.from(Array(31).keys())}
  groupName: null,
  subject: null,
  modalIsFetching: false,
  dateMonth: 9,
  modalIsOpen: false,
};

const gradebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS_NAME_LIST:
      return {
        ...state,
        groupsNameList: action.groupsNameList,
      }

    case SET_GROUP_NAME:
      return {
        ...state,
        groupName: action.groupName,
      }

    case SET_SUBJECTS_LIST:
      return {
        ...state,
        subjectsList: action.subjectsList
      }

    case SET_STUDENTS_NAMES:
      return {
        ...state, 
        students: action.students,
        modalIsOpen: false,
      }

    case SET_SUBJECT:
      return {
        ...state,
        subject: action.subject
      }

    case TOGGLE_MODAL_IS_FETCHING:
      return {
        ...state,
        modalIsFetching: action.modalIsFetching
      }

    case SET_DATE_MONTH:
      return {
        ...state,
        dateMonth: action.dateMonth
      }

    case SET_MODAL_IS_OPEN:
      return {
        ...state, 
        modalIsOpen: action.isOpen,
      }

    case CLEAR_STUDENTS_GRADES:
      return {
        ...state,
        students: [...state.students].map(student => ({...student, grades: []}))
      }

    default:
      return state;
  }
};

export const setGroupNameAC = (groupName) => {
  return {
    type: SET_GROUP_NAME,
    groupName,
  }
}
export const setGroupsNameList = (groupsNameList) => {
  return {
    type: SET_GROUPS_NAME_LIST,
    groupsNameList,
  }
}
export const setSubjectsList = (subjectsList) => {
  return {
    type: SET_SUBJECTS_LIST,
    subjectsList
  }
}
export const setStudentsNameList = (studentsNames) => {
  return {
    type: SET_STUDENTS_NAMES,
    students: studentsNames.map(fullName => ({fullName, grades: []})),
  }
}
export const setSubjectAC = (subject) => {
  return {
    type: SET_SUBJECT,
    subject,
  }
}
export const setStudentGrades = (students) => {
  return {
    type: SET_STUDENTS_NAMES,
    students,
  }
}
export const toggleModalIsFetching = (modalIsFetching) => {
  return {
    type: TOGGLE_MODAL_IS_FETCHING,
    modalIsFetching
  }
}
export const setDateMonth = (dateMonth) => {
  return {
    type: SET_DATE_MONTH,
    dateMonth
  }
}
export const setModalIsOpenAC = (isOpen) => {
  return {
    type: SET_MODAL_IS_OPEN,
    isOpen,
  }
}
export const clearStudentsGrades = () => {
  return {
    type: CLEAR_STUDENTS_GRADES,
  }
}

export const getGroups = () => {
  return (dispatch) => {
    GroupApi.getGroupsNameList().then(data => {
      dispatch(setGroupsNameList(data.groupsNameList))
    })
  }
};
export const setGroupName = (groupName) => {
  return (dispatch) => {
    dispatch(setGroupNameAC(groupName))
    GroupApi.getGroupDetail(groupName).then(data => {
      dispatch(setSubjectsList(data.subjects))
      dispatch(setStudentsNameList(data.students))
    })
  }
}
export const setSubject = (groupName, subject, month) => {
  return (dispatch) => {
    dispatch(setSubjectAC(subject))
    dispatch(clearStudentsGrades())
    return GroupApi.getStudentsGrades(groupName, subject, month).then(data => {
      dispatch(setStudentGrades(data.studentsGrades))
    })
  }
}
export const setModalIsOpen = (isOpen) => {
  return dispatch => {
    dispatch(setModalIsOpenAC(isOpen))
  }
}
export const setNewGrade = (groupName, studentName, subject, dateMonth, dateNum, grade, comment) => {
  const dateApi = `${new Date().getFullYear()}.${dateMonth}.${dateNum}`
  return (dispatch) => {
    dispatch(toggleModalIsFetching(true))
    return GroupApi.setGrade(groupName, subject, studentName, dateApi, grade, comment).then(() => {
      dispatch(setSubject(groupName, subject, dateMonth)).then(() => {
        dispatch(toggleModalIsFetching(false))
      })
    })
  }
}
export const setMonth = (groupName, subject, dateMonth) => {
  return (dispatch) => {
    dispatch(setDateMonth(dateMonth))
    dispatch(setSubject(groupName, subject, dateMonth))
  }
}
export default gradebookReducer;