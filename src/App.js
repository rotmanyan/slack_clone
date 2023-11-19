import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { Header, Sidebar } from './components'
import { Channel, Login, User, Home, Add } from './screens'

import { auth } from './firebase'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const addStructure = (Component, props) => {
    return (
      <>
        <Header />
        <main className="app__body">
          <Sidebar />
          <Component {...props} />
        </main>
      </>
    )
  }

  const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          addStructure(Component, props)
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setIsLoggedIn(true)
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true)
        }
      })
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="app">
      <Router>
        <Switch>
          <GuardedRoute path="/channels/:id" auth={isLoggedIn} component={Channel} />
          <GuardedRoute path="/users/:id" auth={isLoggedIn} component={User} />
          <GuardedRoute path="/add/channel" auth={isLoggedIn} component={Add} />
          <GuardedRoute path="/" auth={isLoggedIn} component={Home} />

          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
