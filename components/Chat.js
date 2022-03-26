import styles from './Chat.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import getEmail from '../lib/getEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function Chat({id, users}) {
    const router = useRouter()
    const [user] = useAuthState(auth);
    const email = getEmail(users, user)
    const [userSnapshot] = useCollection(db.collection('users').where('email', '==', email ))
    const thisuser = userSnapshot?.docs?.[0]?.data()

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    

  return (
    <>
      <div className={styles.container} onClick={enterChat}>
          {thisuser ? <img src={thisuser.photoURL} layout='fill' alt='user avatar' className={styles.useravatar}/> : <AccountCircleIcon sx={{width: '50px', height: '50px'}}/>
          }
          <p className={styles.name}>{thisuser ? thisuser.name : email}</p>
      </div>
    </>
  )
}

export default Chat