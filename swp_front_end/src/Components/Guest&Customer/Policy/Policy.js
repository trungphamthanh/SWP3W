import React from 'react'
import Header from '../Header/Header'
import Banner from '../Banner/Banner'
import Footer from '../Footer/Footer'
import './Policy.scss'
import { Book } from '@mui/icons-material'
import { PolicyMap } from './PolicyMap'

const Policy = () => {
  return (
    <div className='policy-container'>
      <Header/>
      <Banner/>
      <h1 className='policy-header'>Policy</h1>
      {PolicyMap.map((policy)=>(      
      <div className='policy-card' key={policy.title}>
        <h1>{policy.icon}{policy.title}</h1>
        <div className='policy-content'>
            {policy.content}
        </div>
      </div>
      ))}

      <Footer/>
    </div>
  )
}

export default Policy