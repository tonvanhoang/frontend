import '../navbar/nav.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Search from '../search/page';
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avata:string
}
export default function Nav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Lấy toàn bộ đối tượng 'user' từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse lại đối tượng từ JSON
    }
  }, []);

  function ClickSearch() {
    let navconhien = document.getElementById('ulnavcon') as HTMLElement;
    if (navconhien.style.display === 'block') {
      navconhien.style.display = 'none';
    } else {
      navconhien.style.display = 'block';
    }
  }

  return (
    <>
      <nav>
        <i className="iconlogo">R</i>
        <h2>Renet</h2>
        <div className="container_ul">
          <ul>
            <li>
              <Link href="/user/homePage">
                <i className="bi bi-house-door"></i><span>Trang chủ</span>
              </Link>
            </li>
            <li>
              <a href="#" id="searchButton" onClick={ClickSearch}>
                <i className="bi bi-search"></i><span>Tìm kiếm</span>
              </a>
              <Search />
            </li>
            <li className="tinnhan">
              <Link href="/user/mesagePage">
                <i className="bi bi-chat-dots"></i><span>Nhắn tin</span>
              </Link>
            </li>
            <li>
              <Link href="/user/reelPage">
                <i className="bi bi-camera-video"></i><span>Reels</span>
              </Link>
            </li>
            <li>
              <Link href="/user/postORreel">
                <i className="bi bi-plus-circle"></i><span>Đăng bài</span>
              </Link>
            </li>
            <li>
              <Link href="/user/notificationPage">
                <i className="bi bi-bell"></i><span>Thông báo</span>
              </Link>
            </li>
            {
              user && (
                <li>
                <Link href={`/user/profilePage/${user._id}`}>
                  <i className="bi bi-person"></i><span>Hồ sơ</span>
                </Link>
              </li>
              )
            }
            <li>
                <Link href={`/admin/managerPost`}>
                <i className="bi bi-list"></i><span>Quản lí</span>
                </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
