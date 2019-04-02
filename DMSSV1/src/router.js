import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import ScoreTable from './components/scoreTable';
import Profile from './components/profile';
import Register from './components/register';
import ManagerConfirm from './components/managerConfirm';
import Portfolio from './components/portfolio';
import TaskListMain from './components/mains/taskListMain';
import ScoreTableMain from './components/mains/scoreTableMain';
import ProfileMain from './components/mains/profileMain';
import PortfolioMain from './components/mains/portfolioMain';
import ManagerConfirmMain from './components/mains/managerConfirmMain';


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
                 title='taskListMain'
                 />
        </Scene>
        <Scene key='main2'>
          <Scene key='scoreTableMain'
                 component={ScoreTable}
                 title='scoreTableMain'
                 />
        </Scene>
        <Scene key='main3'>
          <Scene key='profileMain'
                 component={Profile}
                 title='profileMain'
                 />
        </Scene>
        <Scene key='main4'>
          <Scene key='PortfolioMain'
                 component={Portfolio}
                 title='PortfolioMain'
                 />
        </Scene>
        <Scene key='main5'>
          <Scene key='ManagerConfirmMain'
                 component={ManagerConfirm}
                 title='ManagerConfirmMain'
                 />
        </Scene>
      </Scene>
      
    </Router>
  )
}

export default RouterComp;
