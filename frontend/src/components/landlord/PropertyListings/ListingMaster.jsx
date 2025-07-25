import React from 'react' 
import ListingBody from './ListingBody'
import ButtonExamples from '@/components/common/Buttons/Button.examples.jsx'

const ListingMaster = () => {
  return (
    <div className="min-h-screen p-6">
    <ListingBody />
    <ButtonExamples />
    </div>
  )
}

export default ListingMaster