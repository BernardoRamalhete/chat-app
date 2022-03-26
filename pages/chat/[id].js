import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatSelector from '../../components/ChatSelector'
import ChatView from '../../components/ChatView'
import { auth, db } from '../../firebase'
import getEmail from '../../lib/getEmail'
import styles from './[id].module.css'

function Chat({chat, messages}) {
    const [user] = useAuthState(auth);
    const email = getEmail(chat.users, user)
    const [userSnapshot] = useCollection(db.collection('users').where('email', '==', email ))
    const thisuser = userSnapshot?.docs?.[0]?.data()


  return (
    <div className={styles.mainconteiner}>
        <Head>
            <title>Chat with {thisuser? thisuser.name : email}</title>
        </Head>
        <ChatSelector />
        <div className={styles.chatconteiner}>
            <ChatView chat={chat} messages={messages} thisuser={thisuser}/>
        </div>

    </div>
  )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id)

    const messageRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

    const messages = messageRes.docs.map(doc => (
        {
            id: doc.id,
         ...doc.data()
        })).map(messages => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime()
        }))

    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}