import React from 'react';
import {Scene,Router,Stack} from 'react-native-router-flux';
import LoginView from './components/loginForm';
import MyComponent from './components/mycomponent';
import TaskDetail from './components/taskDetail';
import Register from './components/register';
import NewTask from './components/newTask';
import Task from './components/task';
import MyComponentMan from './components/myComponentMan';


const ReactRouter = () => {
    return(
        <Router>
            <Scene key="Pages">
                <Scene key="Login" component={LoginView} hideNavBar={true} panHandlers={null} ></Scene>  
                <Scene key="Register" component={Register} hideNavBar={true} panHandlers={null} ></Scene> 
                <Scene key="MyComponent" component={MyComponent} hideNavBar={true} panHandlers={null} ></Scene>
                <Scene key="MyComponentMan" component={MyComponentMan} hideNavBar={true} panHandlers={null} ></Scene>  
                <Scene key="TaskDetail" title="Görev Detayları" component={TaskDetail} hideNavBar={false} panHandlers={null} ></Scene>
                <Scene key="NewTask" title="Yeni Görev" component={NewTask} hideNavBar={false} panHandlers={null} ></Scene>
                <Scene key="Task" title="Görevlerim" component={Task} hideNavBar={false} panHandlers={null} ></Scene>
            </Scene>
        </Router>
    );
}

export default ReactRouter;