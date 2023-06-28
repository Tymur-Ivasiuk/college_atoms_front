import { NavLink } from "react-router-dom";
import s from './Aside.module.css';

const AsideItem = (props) => {
  return (
    <NavLink to={props.link}
      className={(navData) => (navData.isActive ? s.sidebar_active : s.sidebar_link)}>
        {/* <i class="fa-solid fa-house-chimney"></i> */}
        {props.linkName}
    </NavLink>
  );
}

const Aside = (props) => {
  return (
    <aside className={s.asside}>
      <AsideItem {...props} link="/gradebook" linkName="Журнал оцінок"/>
      <AsideItem {...props} link="/group_manager" linkName="Менеджер груп"/>
    </aside>
  );
}

export default Aside