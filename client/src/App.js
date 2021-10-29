import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContexts'
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute'
import PostContextProvider from './contexts/PostContexts'
import AToast from './components/layout/AToast';
import About from './views/About';
function App() {

  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" render={props => <Auth {...props} authRoute='login' />} />
            <Route exact path="/register" render={props => <Auth {...props} authRoute='register' />} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/about" component={About} />
          </Switch>
        </Router>
        <AToast />
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App;
