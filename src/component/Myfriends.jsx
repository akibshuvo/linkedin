import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../component/Image'
import man from '../assets/man3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove, push,set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeChat } from '../slices/activeChatSlice';

const Myfriends = () => {
  const db = getDatabase();
  let navigate = useNavigate()

  let userInfo = useSelector(state => state.logedUser.value)
  let dispatch = useDispatch()
 

  let [myFriendsArr, setmyFriendsarr] = useState([])

  useEffect(()=>{
    const friendRef = ref(db, 'myFriends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(userInfo.uid == item.val().acceptId || userInfo.uid == item.val().myFriendId){
          arr.push({...item.val(), myFriensId: item.key})
        }
        
        
      })
      setmyFriendsarr(arr)
    });
  },[])

  let handleunfriend =(item)=>{
      remove(ref(db,'myFriends/' + item.myFriensId))
  }

  let handleBlock = (item)=>{
      if(userInfo.uid == item.acceptId){
        set(push(ref(db, 'block')), {
          blockKhaise: item.myFriendsName,
          BlockKhaiseId: item.myFriendId,
          marchiAmi: item.acceptName,
          marchiAmiId: item.acceptId,
        }).then(()=>{
          remove(ref(db, 'myFriends/' + item.myFriensId))
        })
      }else{
        set(push(ref(db, 'block')), {
          blockKhaise: item.acceptName,
          BlockKhaiseId: item.acceptId,
          marchiAmi: item.myFriendsName,
          marchiAmiId: item.myFriendId,
        }).then(()=>{
          remove(ref(db, 'myFriends/' + item.myFriensId))
        })
      }
  }

  let handleMgs = ()=>{
    navigate("/mgs")
  }

  let handleChat = (item)=>{
      if(userInfo.uid == item.acceptId){
        console.log(item.myFriendsName)
        dispatch(activeChat({
          type: "single",
          activaChatName: item.myFriendsName,
          activaChatid: item.myFriendId
        }))

      }else{
        console.log(item.acceptName)
        dispatch(activeChat({
          type: "single",
          activaChatName: item.acceptName,
          activaChatid: item.acceptId
        }))
      }
  }
  
  return (
    <>
        <div className='myFriend'>
          <h1>My Friends</h1>
          
         {myFriendsArr.map(item=>(
          <div onClick={()=>handleChat(item)} className='oneFriend'>
          <div className='imgName'>
              <Image src={man}/>
              <div>
              <h3>{userInfo.uid == item.acceptId?item.myFriendsName:item.acceptName}</h3>
              <p>Apps Developer</p>
              </div>
          </div>
          <div className='allBtn'>
          <Button onClick={handleMgs} className='mgsBtn' variant="contained">Massage</Button>
          <Button onClick={()=>handleunfriend(item)} color='info' variant="contained">Unfreind</Button>
          <Button onClick={()=>handleBlock(item)} color='error' variant="contained">block</Button>
          </div>
          </div>
         ))}
        </div>
    </>
  )
}

export default Myfriends