'use client'
import Link from "next/link"
import { useEffect, useState } from 'react';
import Nav from "../../navbar/page"
import '../../profilePage/profile.css'
import Flower from "../../follower/page"
import DangTheoDoi from "../../currentlyMonitoring/page"
import PostIndividual from "../../postIndividual/page"
import ReelIndividual from "../../reelIndividual/page"
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avata:string
}
export default function Profile({params}:{params:{id:string}}) {
  const [user, setUser] = useState<User | null>(null);
  const [friendON,setfriendOn] = useState<any>(null)
  const [friendParams,setfriendParams] = useState<any>(null)
  useEffect(()=>{
    const fetchuser = async ()=>{
      const res = await fetch(`http://localhost:4000/account/accountByID/${params.id}`)
      const data = await res.json()
      setUser(data)
    }
    fetchuser()
  },[params.id])
  function showNguoiTheoDoi() {
    let nguoitheodoi = document.getElementById('containernguoitheodoi') as HTMLElement;
    if (nguoitheodoi) {
      nguoitheodoi.style.display = 'block';
    } else {
      console.error('Element with ID containernguoitheodoi not found');
    }
  }
  function showDangTheoDoi() {
    let dangtheodoi = document.getElementById('containerdangtheodoi') as HTMLElement;
    if (dangtheodoi) {
      dangtheodoi.style.display = 'block';
    } else {
      console.error('Element with ID containerdangtheodoi not found');
    }
  }

  function hienPosts() {
    let post = document.getElementById('containerPosts') as HTMLElement;
    let reel = document.getElementById('containerReels') as HTMLElement;
    if (post && reel) {
      post.style.display = 'block';
      reel.style.display = 'none';
    }
  }

  function hienReels() {
    let post = document.getElementById('containerPosts') as HTMLElement;
    let reel = document.getElementById('containerReels') as HTMLElement;
    if (post && reel) {
      post.style.display = 'none';
      reel.style.display = 'block';
    }
  }
  // đăng xuất
  function signOut(){
    localStorage.removeItem('user')
    alert('Bạn đã đăng xuất thành công!')
    location.href = '/user/login'
  }
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const btnFlower = async () => {
    // Lấy thông tin người dùng đăng nhập từ localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  
    const newFriend = {
      // owner là tài khoản bạn muốn theo dõi (params.id)
      owner: params.id,
      // idAccount là tài khoản người dùng hiện tại (lấy từ localStorage)
      idAccount: loggedInUser._id,
      status: 'đang theo dõi'
    };
  
    const res = await fetch(`http://localhost:4000/friendShip/add`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFriend),
      method: 'POST'
    });
  
    if (res.ok) {
      alert('Thành công');
    } else {
      alert('Thất bại');
    }
  };
  // xét quan hệ
useEffect(()=>{
  const fetchQuanhe_dangdangnhap = async ()=>{
    const dataUser = localStorage.getItem('user');
    if (dataUser) {
      const parsedUser: User = JSON.parse(dataUser);
      const Res = await fetch(`http://localhost:4000/friendShip/detail/${parsedUser._id}`);
      const data = await Res.json();
      console.log('đângngnhap',data)
      setfriendOn(data)
    }
  }
  fetchQuanhe_dangdangnhap()
},[])
useEffect(()=>{
  const fetchQuanhe_params = async ()=>{
    const Res = await fetch(`http://localhost:4000/friendShip/detail/${params.id}`);
    const data = await Res.json();
    console.log('parasm',data)

    setfriendOn(data)
  }
  fetchQuanhe_params()
},[])
  return (
    <>
      <Nav />
      <main>
        <div className="profile-header">
          <div className="profile-pic">
            {
              user && (
                <img src={`/img/${user.avata}`} alt="" />
              )
            }
          </div>
          <div className="profile-info">
            <div className="profile-username">
              {
                user &&(
                  <h5>{user.lastName} {user.firstName}</h5>
                )
              }
              {
                loggedInUser._id === params.id&&(
                  <div>
                <button className="button">
                  <Link href={`/user/editProfilePage/${user?._id}`}>Chỉnh sửa</Link>
                </button>
                <button className="button"><a href="#" onClick={signOut}>Đăng Xuất</a></button>
              </div>
                )
              }
              {
                loggedInUser._id !== params.id&&(
                  <div className="d-none">
                <button className="button">
                  <Link href={`/user/editProfilePage/${user?._id}`}>Chỉnh sửa</Link>
                </button>
                <button className="button"><a href="#" onClick={signOut}>Đăng Xuất</a></button>
              </div>
                )
              }
            </div>
            <div className="profile-stats">
              {
                loggedInUser?._id === params.id && (
                  <span onClick={btnFlower} className="d-none"><label>Theo dõi</label></span>
                )
              }
               {
                loggedInUser?._id !== params.id && (
                  <span onClick={btnFlower} className="d-block"><label>Theo dõi</label></span>
                )
              }
              <a onClick={showNguoiTheoDoi}>497<label>Người theo dõi</label></a>
              <a onClick={showDangTheoDoi}>10000<label>Đang theo dõi</label></a>
            </div>
          </div>
        </div>
        <div className="new-post">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className="tabs">
          <div className="tab">
            <i className="fa-solid fa-grid p-1" onClick={hienPosts}>Posts</i>
          </div>
          <div className="tab">
            <i className="fa-solid fa-grid p-1" onClick={hienReels}>Reels</i>
          </div>
        </div>
        <PostIndividual params={params}/>
        <ReelIndividual />
        <Flower />
        <DangTheoDoi />
      </main>
    </>
  );
}
