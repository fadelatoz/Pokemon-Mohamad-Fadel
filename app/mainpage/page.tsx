"use client"
import Pokemon from '../../components/pokemon'
import Image from 'next/image'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import Head from 'next/head'

async function getPokemons({ pageParam }: { pageParam: number }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=${pageParam}`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  let filtered = await data.results.map((pokemon: {

  }, index: number) => {
    let paddedIndex = pageParam === 0 ? ('00' + (index + 1)).slice(-3) : ('00' + (index + 1 + pageParam)).slice(-3)

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`
    return {
      ...pokemon,
      imageUrl: image
    }
  })
  return filtered
}

export default function Home() {
  const { ref, inView } = useInView();

  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-24">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/redux.png" sizes="any" />
        <link rel="theme-color" content="fff" />
      </Head>
      <h2 className='mt-4 text-lg text-black' data-testid='title' >Pokemon Infinite List</h2>
      <div className='w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4'>
        {pokemons?.pages?.map(page =>
          page.map((pokemon: {
            imageUrl: string,
            name: string
          }, index: number) => {
            if (page.length == index + 1) {
              return <Pokemon
                image={pokemon.imageUrl}
                name={pokemon.name}
                key={index}
                id = {index}
                innerRef={ref}
              />
            } else {
              return <Pokemon
                image={pokemon.imageUrl}
                name={pokemon.name}
                key={index}
                id={index}
              />
            }
          }

          ))}
      </div>
    </main>

  )
}