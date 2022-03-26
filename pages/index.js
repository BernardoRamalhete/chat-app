import Head from 'next/head'
import Image from 'next/image'
import ChatSelector from '../components/ChatSelector'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat app</title>
        <meta name="description" content="A online chat with using Google Authentication"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChatSelector/>
    </div>
  )
}
