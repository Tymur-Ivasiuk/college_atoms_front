const CHANGE_TITLE = "CHANGE_TITLE"

let initialState = {
  currentTitle: "Головна",
};

const navigateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        currentTitle: action.currentTitle,
      }

    default:
      return state;
  }
};

export const changeTitle = (currentTitle) => {
  return {
    type: CHANGE_TITLE,
    currentTitle,
  }
}

export default navigateReducer;