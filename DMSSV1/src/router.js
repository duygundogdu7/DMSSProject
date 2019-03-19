import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import TaskList from './components/taskList';


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
          <Scene key='tasks'
                 component={TaskList}
                 title='Tasks'
                 />
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComp;
