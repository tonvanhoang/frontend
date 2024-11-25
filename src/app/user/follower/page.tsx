import React, { useEffect, useState } from 'react';
import '../follower/flower.css';
export default function Flower() {
  const [followers, setFollowers] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // Đóng danh sách người theo dõi
  const closeNguoiTheoDoi = (): void => {
    setIsVisible(false);
  };
  useEffect(()=>{
    const fetchFlower = async ()=>{
      const showData = localStorage.getItem('user')
      if(showData){
        const dt = JSON.parse(showData)
        const res = await fetch(`http://localhost:4000/account/nguoitheodoi/${dt._id}`)
        const data = await res.json()
        setFollowers(data)
      }
    }
    fetchFlower()
  },[])

  if (!isVisible) return null; // Ẩn component nếu không hiển thị
  const btnxacnhan = async (id:string)=>{
    const resFL = await fetch(`http://localhost:4000/friendShip/detail/${id}`)
    const data = await resFL.json()
    if(data){
      const editStatus = {
        status:'accepted'
      }
      console.log('ádasdsd',data._id)
      const res = await fetch(`http://localhost:4000/friendShip/xacnhan/${data._id}`,{
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(editStatus),
        method:'PUT'
      })
      if(res.ok){
        alert('thành công')
      }
    }
  }
  return (
    <div id="containernguoitheodoi">
      <div className="childnguoitheodoi">
        <div className="header_content">
          <h5>Người theo dõi</h5>
          <i className="bi bi-x-lg" onClick={closeNguoiTheoDoi}></i>
        </div>
        <hr />
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="content">
        {
          followers.map((fl:any)=>(
            <div className="item" key={fl._id} >
              <div className="account">
                <img src={`/img/${fl.avata}`} />
                <a href="#">{fl.firstName} {fl.lastName}</a>
              </div>
              <div>
                <button onClick={()=>btnxacnhan(fl._id)}>
                 Xác nhận
                </button>
              </div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}
