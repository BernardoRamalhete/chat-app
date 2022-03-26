import { useState } from 'react'
import styles from './AddChat.module.css'

function AddChat({addChat, closeModal}) {

    const [userEmail, setUserEmail] = useState('')

    const getUserEmail = (event) => {
        setUserEmail(event.target.value)
    }


  return (
        <>
            <div className={styles.overlay} onClick={closeModal}/>
            
            
            <div className={styles.modal}>
                <h2 className={styles.modaltitle}>Add a new user</h2>
                <p className={styles.modaldetail}>Please, insert the user email to add it</p>
                <label htmlFor='useremail'/>
                <input type="text" className={styles.modalinput} value={userEmail} onChange={getUserEmail} placeholder='User email' name='useremail'/>
                <div className={styles.modalbuttoncontainer}>
                    <button type="button" className={styles.modalbutton} onClick={() =>{addChat(userEmail); closeModal()}}>
                        Add chat
                    </button>
                </div>
            </div>
        </>
  )
}

export default AddChat