import Head from 'next/head'
import styles from './login.module.css'
import ForumIcon from '@mui/icons-material/Forum';
import { auth, provider } from '../firebase';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

  return (
    <div className={styles.container}>
        <Head>
            <title>Login</title>
        </Head>

        <div className={styles.logincontainer}>
            <ForumIcon sx={{width: '200px', height: '200px'}}/>
            <h1 className={styles.logintitle}>Welcome</h1>
            <button type='submit' onClick={signIn} className={styles.loginbutton}>SIGN IN WITH GOOGLE</button>
        </div>
    </div>
  )
}

export default Login