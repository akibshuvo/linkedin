import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../component/Image'
import man from '../assets/man3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';


const AllUser = () => {
  const db = getDatabase();

  let [allUserArr, setAllUserArr] = useState([]);
  let [reqArr, setReqArr] = useState([]);
  let [myFriendsArr, setMyFriendsArr] = useState([]);
  let [blockArr, setBlockArr] = useState([]);

  let userInfo = useSelector(state => state.logedUser.value)


  useEffect(()=>{
    const userRef = ref(db, 'allUser');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        
        if(item.val().userId != userInfo.uid){
          arr.push(item.val())
        }
        
      })
      setAllUserArr(arr)
    });
  },[])

  useEffect(()=>{
    const userRef = ref(db, 'reqList');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
          arr.push(item.val().iReqUserId+item.val().recevierUserId)
      })
      setReqArr(arr)
    });
  },[])


  useEffect(()=>{
    const userRef = ref(db, 'myFriends');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
          arr.push(item.val().acceptId+item.val().myFriendId); 
      })
      setMyFriendsArr(arr)
    });
  },[])


  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
          arr.push(item.val().BlockKhaiseId+item.val().marchiAmiId); 
      })
      setBlockArr(arr)
    });
  },[])


  let handleReq = (item)=>{
      set(push(ref(db, 'reqList')), {
        recevierName: item.userName,
        recevierEmail: item.email,
        recevierUserId: item.userId,

        iReqName: userInfo.displayName,
        iReqEmail: userInfo.email,
        iReqUserId: userInfo.uid
        
        
      });


  }


  return (
    <>
    <div className='myFriend'>
      <h1>All People</h1>

      {allUserArr.map(item=>(
        <div className='oneFriend'>
        <div className='imgName'>
            <Image src={man}/>
            <div>
            <h3>{item.userName}</h3>
            <p>Apps Developer</p>
            </div>
        </div>
        <div className='allBtn'>
        {reqArr.includes(userInfo.uid+item.userId) || reqArr.includes(item.userId+userInfo.uid)
        ?<Button color='info' variant="contained">panding</Button>
        : myFriendsArr.includes(userInfo.uid+item.userId)|| myFriendsArr.includes(item.userId+userInfo.uid)
        ?<Button  color='success' variant="contained">Friend</Button>
        : blockArr.includes(userInfo.uid+item.userId)|| blockArr.includes(item.userId+userInfo.uid)
        ?<Button color='error' variant="contained">block</Button>
        :<Button onClick={()=>handleReq(item)} className='mgsBtn' variant="contained">Add Friend</Button>
        
        
        }
            
              
            
        
        {/* <Button color='info' variant="contained">Unfreind</Button>
        <Button color='error' variant="contained">block</Button> */}
        </div>
        </div>
      ))}
      
      
      
    </div>
</>
  )
}

export default AllUser