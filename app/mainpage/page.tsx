"use client"
import { useState, useEffect, Key } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Pokemon from '../../components/pokemon'

async function getPokemons({ pageParam }: { pageParam: number }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=${pageParam}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data.results.map((pokemon: any, index: number) => {
    const paddedIndex = ('00' + (pageParam + index + 1)).slice(-3)
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`
    return {
      ...pokemon,
      imageUrl: image
    }
  })
}

export default function MainPage() {
  const { ref, inView } = useInView()
  const [searchValue, setSearchValue] = useState('')

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam = 0 }) => getPokemons({ pageParam }),
    getNextPageParam: (lastPage: string | any[], allPages: string | any[]) => {
      return lastPage.length === 20 ? allPages.length * 20 : undefined
    },
    initialPageParam: 0,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registration successful with scope: ', registration.scope)
        }).catch(error => {
          console.log('Service Worker registration failed: ', error)
        })
    }
  }, [])

  const filteredData = data?.pages?.flat().filter((pokemon: { name: string }) => pokemon.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <main className="flex min-h-screen bg-white dark:bg-slate-900 flex-col justify-between p-5 md:p-24">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/redux.png" sizes="any" />
        <link rel="theme-color" content="#fff" />
      </Head>
      <h2 className='mt-4 items-center flex justify-center text-4xl font-mono font-bold text-black dark:text-white' data-testid='title'>Pokemon Infinite List</h2>
      <div className='flex justify-start text-start items-start md:ml-36'>
        <input
          type="text"
          placeholder="Search Pokemon By Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-5 p-2 border text-white dark:text-black bg-slate-900 dark:bg-white rounded"
        />
      </div>
      <div className='w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4'>
        {filteredData?.map((pokemon: { imageUrl: string; name: string }, overallIndex: Key | null | undefined) => {
          const isLastElement = overallIndex === filteredData.length - 1
          return (
            <Pokemon
              image={pokemon.imageUrl}
              name={pokemon.name}
              key={overallIndex}
              id={overallIndex}
              innerRef={isLastElement ? ref : undefined}
            />
          )
        })}
      </div>
    </main>
  )
}
