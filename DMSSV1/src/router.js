import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import Register from './components/register';
import ManagerConfirm from './components/managerConfirm';
import TaskListMain from './components/mains/taskListMain';
import ScoreTableMain from './components/mains/scoreTableMain';
import ProfileMain from './components/mains/profileMain';
import PortfolioMain from './components/mains/portfolioMain';
import UpdateTask from './components/updateTask';
import AddTask from './components/addTask';


const RouterComp = () => {
  return (
    <Router titleStyle={{color: '#E87B79'}}>
      <Scene key='root' hideNavBar={true}>
        <Scene key='auth'>
          <Scene key='login'
                 component={LoginForm}
                 title='Login'
                 hideNavBar={true}
                 initial
                 />
        </Scene>
        <Scene key='main'>
          <Scene key='taskListMain'
                 component={TaskListMain}
                 title='Görev Listesi'
                 />
        </Scene>
        <Scene key='main2'>
          <Scene key='scoreTableMain'
                 component={ScoreTableMain}
                 title='Puan Tablosu'
                 />
        </Scene>
        <Scene key='main3'>
          <Scene key='profileMain'
                 component={ProfileMain}
                 title='Benim Sayfam'
                 />
        </Scene>
        <Scene key='main4'>
          <Scene key='PortfolioMain'
                 component={PortfolioMain}
                 title='Portföy Hesaplama'
                 />
        </Scene>
        <Scene key='main5'>
          <Scene key='ManagerConfirmMain'
                 component={ManagerConfirm}
                 title='Takımım'
                 />
        </Scene>
        <Scene key='main6'>
          <Scene key='Register'
                 component={Register}
                 title='Register'
                 />
        </Scene>
        <Scene key='main7'>
          <Scene key='UpdateTask'
                 component={UpdateTask}
                 title='UpdateTask'
                 />
        </Scene>
        <Scene key='main8'>
          <Scene key='AddTask'
                 component={AddTask}
                 title='AddTask'
                 />
        </Scene>
      </Scene>
      
    </Router>
  )
}

export default RouterComp;
