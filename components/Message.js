import moment from 'moment';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import styles from './Message.module.css'

function Messages({user, message, onFocus}) {
  const [loggedUser] = useAuthState(auth)

  const messageType = user === loggedUser.email ? 'Sender' : 'Receiver';
  const playAudio = (src) => {
    const audio = new Audio(src)
    audio.play();
  }

  useEffect(()=> {
    if(!onFocus) {
      playAudio("/notification.mp3")
    }
  },[])
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