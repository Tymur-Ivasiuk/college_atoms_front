import { GroupApi } from "../api/api";

const SET_GROUPS = "SET_GROUPS"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_SUBJECT_MODAL_FORM = "SET_SUBJECT_MODAL_FORM"
const TOGGLE_SUBJECT_IS_FETCHING = "TOGGLE_SUBJECT_IS_FETCHING"

let initialState = {
  groups: [
    {
      groupName: "31-KH", 
      students: [
        {
          fullName: "Бестанчук Богдан Володимирович",
          averageGrade: 46.5,
        }
      ],
      subjects: [
        "Математика",
        "Укр мова",
        "Прога",
      ]
    }
  ],
  isFetching: false,
  subjectModalForm: false,
  subjectIsFetching: false,
};

const groupManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        groups: action.groups,
        isFetching: false,
      }
    
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }

    case SET_SUBJECT_MODAL_FORM:
      return {
        ...state,
        subjectModalForm: action.subjectModalForm
      }

    case TOGGLE_SUBJECT_IS_FETCHING:
      return {
        ...state,
        subjectIsFetching: action.subjectIsFetching
      }

    default:
      return state;
  }
};

export const setGroupsAC = (groups) => {
  return {
    type: SET_GROUPS,
    groups
  }
}
export const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    isFetching
  }
}
export const setSubjectModalFormAC = (subjectModalForm) => {
  return {
    type: SET_SUBJECT_MODAL_FORM,
    subjectModalForm
  }
}
export const setSubjectFetchingAC = (subjectIsFetching) => {
  return {
    type: TOGGLE_SUBJECT_IS_FETCHING,
    subjectIsFetching
  }
}


export const getGroups = () => {
  return (dispatch) => {
    dispatch(setIsFetching(true))
    dispatch(setSubjectFetchingAC(false))
    dispatch(setSubjectModalFormAC(false))
    GroupApi.getGroupsListDetails().then(data => {
      dispatch(setGroupsAC(data.groups))
    })
  }
}
export const addNewSubject = (groupName, subject) => {
  return (dispatch) => {
    dispatch(setSubjectFetchingAC(true))
    GroupApi.addSubjectToGroup(groupName, subject).then(data => {
      dispatch(getGroups())
    })
  };
}
export const setSubjectModalForm = (subjectModalForm) => {
  return (dispatch) => {
    dispatch(setSubjectModalFormAC(subjectModalForm))
  }
}
export const setSubjectFetching = (subjectIsFetching) => {
  return (dispatch) => {
    dispatch(setSubjectFetchingAC(subjectIsFetching))
  }
}

export default groupManagerReducer;