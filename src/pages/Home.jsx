import React, { useEffect } from 'react'
import Image from '../component/Image'
import Logo from '../assets/Logo.png'
import profile from "../assets/profile.png"
import cover from "../assets/cover.png"
import Button from '@mui/material/Button';
import {IoIosSend} from 'react-icons/io'
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import up from '../assets/up.png'
import ui from '../assets/ui.png'
import ed from '../assets/edu.png'
import { useDispatch,useSelector } from 'react-redux';
import { logedUser } from '../slices/userSlice';
import { useNavigate,Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import Navber from '../component/Navber'

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()


  let data = useSelector(state => state.logedUser.value)

  

  let dispatch = useDispatch()

  useEffect(()=>{
    if(!data){
      navigate("/login")
    }
  },[])
  

  let handleLogedOut = ()=>{
    signOut(auth).then(() => {
      dispatch(logedUser(null))
      localStorage.removeItem('user')
      navigate("/login")
    })
  }
 


  return (
    <>
      <Navber/>

    <div className='homePage'>
      
     
      <div className='myProfile'>
         <Image src={cover}/>
         <div className='picBio'>
          <div className='ppppp'>
         <Image className="myprofilePic" src={data.photoURL}/>
         </div>

         <div>
          <div className='plane'>
          <h2>{data.displayName}</h2>

          <div className='sendIcons'>
          <IoIosSend className='icons'/>
          <p className='biosPp'>Saint Petersburg, Russian Federation</p>
          </div>

          </div>
          <p className='biosP'>Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.</p>
          <Button className='forgetBtn' variant="contained">Contact info</Button> 
         </div>
         </div>

         <div className='menu'>
          <div className='items active'>PROFILE</div>
          <Link to="/friends"><div className='items'>FRIENDS</div></Link>
          <Link to="/post"><div className='items'>POST</div></Link>
         </div>

      {/* ==== about content start ==== */}
      <div className='aboutContent'>
        <h1 className='aboutHeading'>About</h1>
        <p className='biosP'>I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites. </p>
        <a href="">SEE MORE</a>
      </div>
      {/* ==== about content end ==== */}

      {/* ==== project content start ==== */}
      <div className='projetcsContetnt'>
        <div className='pageNumber'>
          <h2>Projects</h2>
          <h2 className='number'>3 of 12</h2>
        </div>
        <div className='projetcImg'>
          <Image src={p1}/>
          <Image src={p2}/>
          <Image src={p3}/>

        </div>
      </div>
      {/* ==== project content end ==== */}

      {/* ----- experience part start ----- */}
      <div className='box'>
      <div className='experiencePart'>
        <h2>Experience</h2>
        <div className='experImage'>
          <div>
          <Image src={ui}/>
          </div>
          <div>
            <h3 className='freelance'>Freelance UX/UI designer</h3>
            <div className='employed'>
              <h5 className='self'>Self Employed</h5>
              <p>Around the world</p>
            </div>
            <div className='employed'>
              <p>Jun 2016 — Present</p>
              <p className='colortree'>3 yrs 3 mos</p>
            </div>
            <p className='biosP'>Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.</p>

          </div>
        </div>
        
      </div>
      <div className='experiencePart'>
        <div className='experImage'>
          <div>
          <Image src={up}/>
          </div>
          <div>
            <h3 className='freelance'>UX/UI designer</h3>
            <div className='employed'>
              <h5 className='self'>Upwork</h5>
              <p>International</p>
            </div>
            <div className='employed'>
              <p>Jun 2019 — Present</p>
              <p className='colortree'>3 mos</p>
            </div>
            <p className='biosP'>New experience with Upwork system. Work in next areas: UX/UI design, graphic design, interaction design, UX research.</p>

          </div>
        </div>
        
      </div>
      </div>
      {/* ----- experience part end ----- */}

{/*====== educations part start====== */}
            <div className='eduBox'>
              <h2>Education</h2>
              <div className='eduflex'>
                <div>
                  <Image src={ed}/>
                </div>
                <div>
                  <h3 className='eduTitle'>Moscow State Linguistic University</h3>
                  <p className='biosP'>Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance</p>
                  <p className='edup'>2013 — 2017</p>
                  <p className='biosP'>Additional English classes and UX profile courses​.</p>
                </div>
              </div>
            </div>
{/*====== educations part end====== */}

<Button onClick={handleLogedOut} className='logout' variant="contained">LogOut</Button> 

      </div>
      
      
     
    
    </div>
    </>
  )
}

export default Home