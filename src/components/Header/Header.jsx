import s from './Header.module.css';
import logo from '../../assets/img/image 1.svg';
import { useLocation } from 'react-router-dom';


const Header = (props) => {
  const { pathname } = useLocation();
  let header_title;
  switch(pathname) {
    case "/gradebook":
      header_title = "Журнал оцінок"
      break

    case "/login":
      header_title = "Логін"
      break

    case "/group_manager":
      header_title = "Менеджер груп"
      break

    default:
      header_title = "Головна"
  }

  return (
    <header className={s.header}>
      <img src={logo} />
      <div className={s.header_title}>{header_title}</div>
      <div></div>
    </header>
  )
}

export default Header