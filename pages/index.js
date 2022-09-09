import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { PrismaClient } from '@prisma/client'
import { useState } from 'react'


const prisma = new PrismaClient()

export default function Home({data}) {

  const [formData, setFormData] = useState({})

  const saveMovie = e =>{
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Movies list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul className={styles.movielist}>
          {data.map(item =>(
            <li key={item.id}>{item.title} 
              <span><strong> {item.title} </strong> </span>
              <span>{item.description} </span>
              <span>{item.year} </span>
            
            </li>
          ))}
        </ul>

          <form className={styles.movieform} onSubmit={saveMovie} >
            <input type="text" placeholder="Title" name="title" onChange={e => setFormData({...formData, title: e.target.value})} />
            <input type="text" placeholder="Year" name="year" onChange={e => setFormData({...formData, year: e.target.value})} />
            <textarea id="" cols="30" rows="10"  placeholder="Description" name="description" onChange={e => setFormData({...formData, description: e.target.value})} />
            <input type="text" placeholder="Slug" name="slug" onChange={e => setFormData({...formData, slug: e.target.value})} />

            <button type='submit'>Add movie</button>
          </form>

      </main>
    </div>
  )
}


export async function getServerSideProps(){

  const movies = await prisma.movie.findMany()

  const data = [
    {
      id: 1,
      title: 'title'
    },
    {
      id: 2,
      title: 'Another title'
    }
  ]

  return {
    props: {data: movies}
  }
}
