import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import Register from './components/register';
import ManagerConfirm from './components/managerConfirm';
import TaskListMain from './components/mains/taskListMain';
import ScoreTableMain from './components/mains/scoreTableMain';
import ProfileMain from './components/mains/profileMain';
import PortfolioMain from './components/mains/portfolioMain';


const RouterComp = () => {
  return (
    <Router>
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
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main2'>
          <Scene key='scoreTableMain'
                 component={ScoreTableMain}
                 title='scoreTableMain'
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main3'>
          <Scene key='profileMain'
                 component={ProfileMain}
                 title='profileMain'
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main4'>
          <Scene key='PortfolioMain'
                 component={PortfolioMain}
                 title='PortfolioMain'
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main5'>
          <Scene key='ManagerConfirmMain'
                 component={ManagerConfirm}
                 title='ManagerConfirmMain'
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main6'>
          <Scene key='Register'
                 component={Register}
                 title='Register'
                 hideNavBar={true}/>
        </Scene>
      </Scene>
      
    </Router>
  )
}

export default RouterComp;
