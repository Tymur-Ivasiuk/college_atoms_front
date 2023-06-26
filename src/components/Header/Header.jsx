import s from './Header.module.css';
import logo from '../../assets/img/image 1.svg';


const Header = (props) => {
  return (
    <header className={s.header}>
      <img src={logo} />
      <div className={s.header_title}>{props.currentTitle}</div>
      <div></div>
    </header>
  )
}

export default Header