import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ChatSelector from '../components/ChatSelector'
import MainPageView from '../components/MainPageView'

export default function Home() {
  const [modalValue, setModalValue] = useState(false)

  const getModalValue = (value) => {
    setModalValue(value)
  }

  useEffect(()=> {console.log(modalValue)}, [modalValue])

  return (
    <div >
      <Head>
        <title>Chat app</title>
        <meta name="description" content="A online chat with using Google Authentication"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>

        <MainPageView modalValue={modalValue}/>
        <ChatSelector getModalValue={getModalValue}/>

      </div>
    </div>
  )
}
