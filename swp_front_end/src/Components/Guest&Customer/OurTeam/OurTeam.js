import React from 'react'
import "./OurTeam.scss"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Banner from '../Banner/Banner'
import { OurTeamMap } from './OurTeamMap'

const OurTeam = () => {
  return (
    <div className='ourteam-container'>
      <Header/>
      <Banner/>
        <div className='ourteam-main'>
          <h1 className='ourteam-header'>Our Team</h1>
          {OurTeamMap.map((member)=> (
            <div className='ourteam-member' key={member.name}>
                <img src={member.image} className='ourteam-image'/>
                <div className='ourteam-content'>
                    <h1>{member.name}</h1>
                    <div className='ourteam-description'>
                      {member.description}
                    </div>
                </div>
            </div>
          ))}
        </div>
      <Footer/>
    </div>
  )
}

export default OurTeam