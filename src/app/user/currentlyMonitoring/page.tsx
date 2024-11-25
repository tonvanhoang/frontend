import React, { useEffect, useState } from 'react';
import '../currentlyMonitoring/current.css';

// Định nghĩa kiểu cho follower
interface Follower {
  _id: string;
  name: string;
  image: string;
}

export default function DangTheoDoi() {
  const [following, setFollowing] = useState<Follower[]>([]); // Sử dụng kiểu Follower cho state

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch('http://localhost:4000/followers'); // Địa chỉ API để lấy danh sách người theo dõi
        const data: Follower[] = await response.json(); // Định nghĩa kiểu cho dữ liệu nhận được
        setFollowing(data); // Cập nhật state với dữ liệu người đang theo dõi
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing(); // Gọi hàm fetchFollowing khi component mount
  }, []);

  const unfollowUser = async (id: string) => { // Định nghĩa kiểu cho id
    try {
      await fetch(`http://localhost:4000/followers/${id}`, {
        method: 'DELETE',
      });
      // Cập nhật lại danh sách followers
      setFollowing((prevFollowing) => prevFollowing.filter(follower => follower._id !== id));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  function closeDangTheoDoi() {
    const dangtheodoi = document.getElementById('containerdangtheodoi') as HTMLElement; // Khai báo kiểu cho phần tử HTML
    dangtheodoi.style.display = 'none';
  }

  return (
    <>
      <div id="containerdangtheodoi">
        <div className="childdangtheodoi">
          <div className="header_content">
            <h5>Đang theo dõi</h5>
            <i className="bi bi-x-lg" onClick={closeDangTheoDoi}></i>
          </div>
          <hr />
          <input type="text" placeholder="Tìm kiếm" />
          <div className="content">
            {following.map(follower => (
              <div className="item" key={follower._id}>
                <div className="account">
                  <img src={follower.image} alt={follower.name} />
                  <a href="#">{follower.name}</a>
                </div>
                <div>
                  <button onClick={() => unfollowUser(follower._id)}>Bỏ theo dõi</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
