import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../firebase'
import styles from './ChatView.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EditIcon from '@mui/icons-material/Edit';
import Message from './Message'
import { useEffect, useRef, useState } from 'react'
import firebase from 'firebase/compat/app'
import getEmail from '../lib/getEmail'
import TimeAgo from 'timeago-react'
import DeleteIcon from '@mui/icons-material/Delete';

function ChatView({chat, messages, thisuser}) {
    const [user] = useAuthState(auth)
    const email = getEmail(chat.users, user)
    const [input, setInput] = useState('')
    const router = useRouter()
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'))
    const endOfMessagesRef = useRef(null)

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
    
    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message 
                    key={message.id} 
                    user={message.data().user} 
                    message={
                        {
                        ...message.data(),
                         timestamp: message.data().timestamp?.toDate().getTime()
                        }
                    }
                />
            ))
        } else {
            return JSON.parse(messages).map(message => 
                <Message 
                    key={message.id} 
                    user={message.user} 
                    message={message}
                />
                )
            }
        }

    const sendMessage = (event) => {
        event.preventDefault()
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput('')
        scrollToBottom()
    }

    const deleteChat = () => {
        router.push('/')
        db.collection('chats').doc(router.query.id).delete()
    } 

    useEffect(()=> {scrollToBottom()},[])
    return (
    <div className={styles.container}>
        <div className={styles.header}>
            {thisuser ? <img src={thisuser.photoURL} className={styles.useravatar}/> : <AccountCircleIcon sx={{width: '70px', height: '70px'}}/>}

            <div className={styles.headerinfo}>
                <div className={styles.textinfo}>

                    <h3>{thisuser? thisuser.name : email}</h3>
                    {thisuser && (
                        <p>Last active: {thisuser?.lastSeen?.toDate() ? 
                        (<TimeAgo datetime={thisuser?.lastSeen?.toDate()}/>)  :
                        'Never' }
                        </p>
                        )
                    }

                </div>
                
                <DeleteIcon className={styles.deleteicon} onClick={deleteChat}/>
            </div>
        



        </div>
        
        <div className={styles.messagescontainer}>
            {showMessages()
            }
            <div className={styles.endofmessage} ref={endOfMessagesRef}/>
        </div>

        <form className={styles.inputcontainer}>
            <EditIcon/>
            <input type='text' placeholder='Write your message here...' value={input} onChange={e => setInput(e.target.value)}/>
            <button hidden disabled={!input} type='submit' onClick={sendMessage}>Send message</button>
        </form>
    </div>
  )
}

export default ChatView