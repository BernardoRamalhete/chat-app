import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import styles from './Message.module.css'

function Messages({user, message}) {
  const [loggedUser] = useAuthState(auth)

  const messageType = user === loggedUser.email ? 'Sender' : 'Receiver';



  return (
    <div className={styles.container}>

          <p className={`${styles.message} ${messageType === 'Sender' ?
           styles.sender :
            styles.receiver}`}>
          {message.message}
          <span className={styles.timestamp}>
            {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
          </span>
          </p> 
        
    </div>
  )
}

export default Messages