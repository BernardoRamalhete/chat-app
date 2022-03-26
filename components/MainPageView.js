import styles from './MainPageView.module.css'

function MainPageView({modalValue}) {
  return (
      <div className={styles.container} style={modalValue ? {filter:'blur(3px)'} : {}}>

        <div className={styles.content}>

            <div className={styles.header}>

                <h1>Welcome to Chat App</h1>
                <h2>To start chatting you can click the arrow in the left side of the screen</h2>

            </div>

            <div className={styles.text}>

                <p>Over there you will be able to add new contacts using their google account&apos;s email!</p>
                <p>When they enter Chat App they will receive any messages you sended and will be able to responde.</p>

            </div>

        </div>

      </div>
  )
}

export default MainPageView