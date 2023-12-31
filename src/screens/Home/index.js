import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

import './styles.css'

export const Home = () => {
  const history = useHistory()

  const addChannel = () => history.push('/add/channel')

  return (
    <div className="home">
      <div className="home__container">
        <img src="/logo.svg" alt="Slack Logo" />
        <h1>Welcome to Slack</h1>
        <p>
          Slack brings all your team communication into one place, makes it all
          instantly searchable and available wherever you go.
        </p>

        <p>
          Our aim is to make your working life simpler, more pleasant and more
          productive.
        </p>

        <Button onClick={addChannel}>Create Channel</Button>
      </div>
    </div>
  )
}
