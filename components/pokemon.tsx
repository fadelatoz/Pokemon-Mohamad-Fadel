import React from 'react'
import Image from 'next/image'

interface PokemonProps {
  name: string,
  image: string,
  id? : number | any,
  innerRef?: (node?: Element | null | undefined) => void
}

const Pokemon: React.FC<PokemonProps> = ({ name, image,id, innerRef }) => {

  const linkToDetail = () => {
    window.open(`/detail-pokemon?id=${id !== undefined && id + 1}`, '_blank');  }

  return (
    <React.Fragment>
      <div onClick={() => linkToDetail()} ref={innerRef}
      >
        <div className='flex flex-row cursor-pointer shadow-lg bg-white border-r-4  gap-4 items-center p-2 rounded'>
          <div className='rounded-full w-[4.5rem] h-[4.5rem]'>
            <Image src={image} alt='profileImg' width={200} height={200} className='rounded-full object-cover' />
          </div>
          <div><span data-testid = {'pokemon-name'} className='text-black'>{name}</span></div>

          <div><span className='text-black'>#0{id + 1}</span></div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Pokemon