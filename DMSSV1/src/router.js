import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import Task from './components/task';


const RouterComp = () => {
  return (
    <Router titleStyle={{color: '#E87B79'}}>
      <Scene key='root' hideNavBar={true}>
        <Scene key='auth'>
          <Scene key='login'
                 component={LoginForm}
                 title='Login'
                 hideNavBar={true}
                 />
        </Scene>
        <Scene key='main'>
          <Scene key='tasks'
                 component={Task}
                 title='Tasks'
                 />
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComp;
