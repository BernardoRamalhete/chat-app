import AddChat from './AddChat'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Chat from '../components/Chat'
import * as EmailValidator from 'email-validator'
import {useEffect, useState} from 'react'
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import styles from './ChatSelector.module.css'

function ChatSelector() {
  const [modalControl, setModalControl] = useState(false);
  const [chatsControl, setChatsControl] = useState(false);
  
  const [user] = useAuthState(auth)
  const userChat = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChat)
  const [userSnapshot] = useCollection(db.collection('users').where('email', '==', user.email ))
  const thisuser = userSnapshot?.docs?.[0]?.data()
  
  const addChat = (input) => {
    if (!input) return null;

    if(EmailValidator.validate(input) && !chatExists && input !== user.email) {
      db.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  const chatExists = (input) => {
    // '!!' Converts truthy and falsy to boolean
    return !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === input)?.lenght > 0);
  }

  const closeModal = () => {
    setModalControl(false);
  }

  const handleChats = () => {
    setChatsControl((prevState) => !prevState);
  }

  return (
    <>
      <div className={chatsControl ? styles.arrow : styles.arrowinverted} onClick={handleChats}>
        <ArrowBackIosNewIcon sx={{width: '50px', height: '50px'}} />
      </div>
      <div className={chatsControl ? styles.container : styles.containerclosed} style={modalControl ? {filter: 'blur(3px)'} : {}}>
        <div className={styles.profileinfo}>
          <img src={user.photoURL} alt={user.name} className={styles.userimage}/>
          <div className={styles.profiletext}>  
            <h3 className={styles.profilename}>{thisuser ? thisuser.name : user.email}</h3>
            <p className={styles.logout} onClick={() => auth.signOut()}>log out</p>
          </div>
        </div>

        <div className={styles.search}>
          <SearchIcon/>
          <input type='text' placeholder='Seach in chats' className={styles.searchinput}/>
        </div>

        <button className={styles.addchatbutton} onClick={() => {setModalControl(true)}}>
          <AddIcon className={styles.addicon}/>
          START A NEW CHAT
        </button>

        {chatsSnapshot?.docs.map(chat => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        ))}
      </div>

      {modalControl && <AddChat addChat={addChat} closeModal={closeModal}/>}
    </>
  )
}

export default ChatSelector