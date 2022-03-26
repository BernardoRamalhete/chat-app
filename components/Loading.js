import React from 'react'
import {FoldingCube} from 'better-react-spinkit'
import styles from './Loading.module.css'

function Loading() {
  return (
    <center className={styles.loading}>
        <FoldingCube size={200}/>
    </center>
  )
}

export default Loading