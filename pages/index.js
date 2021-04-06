import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client.js";


export async function getStaticProps() {
  const { loading, error, data } = await client.query({
    query: gql`
    query {
      characters{
        results{
          name
          status
          image
        }
      }
    }
    `,
  });

  return {
    props: {
      characters: data.characters.results
    },
 };
}

export default function Home({ characters }) {
  console.log(characters)
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

        <div className={styles.grid}>
          {characters.map((character) => (
            <div key={character.name} className={styles.card}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name}/>
              <p>
                {character.status}
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
