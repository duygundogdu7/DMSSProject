import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/loginForm';
import Task from './components/task';

const RouterComp = () => {
  return (
    <Router titleStyle={{color: '#E87B79'}}>
      <Scene key='root' >
        <Scene key='auth'>
          <Scene key='login'
                 component={LoginForm}
                 title='Login'
                 />
        </Scene>
        <Scene key='main'>
          <Scene key='task'
                 component={Task}
                 title='Tweets'
                 initial
                 />
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComp;
