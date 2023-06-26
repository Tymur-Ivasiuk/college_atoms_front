import { NavLink } from "react-router-dom";
import s from './Aside.module.css';
import { connect } from "react-redux";
import { changeTitle } from '../../redux/navigateReducer';

const AsideItem = (props) => {
  const onPageChange = (linkName) => {
    props.navigateCallback(linkName)
  }

  return (
    <NavLink to={props.link} 
    onClick={() => onPageChange(props.linkName)} 
    className={`${s.sidebar_link} ${props.linkName===props.currentTitle && s.sidebar_active}`}>
      {/* <i class="fa-solid fa-house-chimney"></i> */}
      {props.linkName}
    </NavLink>
  );
}

const Aside = (props) => {
  return (
    <aside className={s.asside}>
      <AsideItem {...props} link="/gradebook" linkName="Журнал оцінок"/>
    </aside>
  );
}


const mapStateToProps = (state) => {
  return {
    currentTitle: state.navigate.currentTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    navigateCallback: (linkName) => {
      dispatch(changeTitle(linkName))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aside);