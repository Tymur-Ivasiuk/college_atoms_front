import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/v1.0/";

const instance = axios.create({
  baseURL: base_url,
  // headers: {
  //   Authorization: "Token 5ab9c7e2491ffe7b3b33388a742ddf24ce4e8459",
  // },
});


// only `actionType` in ALL POST
export const GroupApi = {
  getGroupsNameList() {
    const params = new URLSearchParams();
    params.append("actionType", "GET_GROUPS_NAME_LIST")

    return instance.post('', params).then(response => response.data)
  },
  getGroupDetail(groupName) {
    const params = new URLSearchParams();
    params.append("actionType", "GET_GROUP_DETAIL")
    params.append("groupName", groupName)

    return instance.post('', params).then(response => response.data)
  },
  getStudentsGrades(groupName, subject, month) {
    const params = new URLSearchParams();
    params.append("actionType", "GET_STUDENTS_GRADES")
    params.append("groupName", groupName)
    params.append("subject", subject)
    params.append("month", month)

    return instance.post('', params).then(response => response.data)
  },
  setGrade(groupName, subjectName, studentName, dateInfo, mark) {
    const params = new URLSearchParams();
    params.append("actionType", "GIVE_GRADE_TO_STUDENTS")
    params.append("groupName", groupName)
    params.append("studentName", studentName)
    params.append("subject", subjectName)
    params.append("dateInfo", dateInfo)
    params.append("mark", mark)

    //giveGradeToTheStudent("32-RS", "Прога", "Білецький Максим Володимирович", "2022.08.04", 12)
    return instance.post('', params).then(response => response.data)
  }
}