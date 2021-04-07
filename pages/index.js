import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client.js";
import React, {useState} from 'react';


export async function getStaticProps() {
  const { loading, error, data } = await client.query({
    query: gql`
    query {
      characters(filter: { name: "morty" }){
        results{
          name
          status
          image
        }
      }
    }
    `,
  });
  console.log(searchinput)
  return {
    props: {
      characters: data.characters.results
    },
 };
}

export default function Home({ characters }) {
  const [searchinput, setSearch] = useState('');

  console.log(searchinput)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <input type="text" placeholder="search character" onChange={event => setSearch(event.target.value)}/>
        <div className={styles.grid}>
          {characters.map((character) => (
            <div key={character.name} className={styles.card}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name}/>
              <p>
                Status : {character.status}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
