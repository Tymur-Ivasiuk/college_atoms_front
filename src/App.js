import './App.css';
import 'react-js-dropdavn/dist/index.css'
import HeaderContainer from './components/Header/HeaderContainer';
import Aside from './components/Aside/Aside';
import { Route, Routes } from 'react-router-dom';
import GradebookContainer from './components/Gradebook/GradebookContainer';
import Login from './components/Login/Login';
import GroupManagerContainer from './components/GroupManager/GroupManagerContainer';



function App() {
  return (
    <>
      <HeaderContainer />

      <main>
        <Aside />

        <div class="content">
          <Routes>
              <Route path='/gradebook' element={<GradebookContainer />}/>
              <Route path='/group_manager' element={<GroupManagerContainer />}/>
              <Route path='/login' element={<Login />}/>
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
