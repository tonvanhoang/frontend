'use client'
import '../mesagePage/mesage.css'
import Nav from '../navbar/page'
export default function Mesage(){
    return(
        <>
        <Nav/>
         <div className="message-list" id="message-list">
        <div className="message-list-header">
          <h5 className="fw-bold mb-0">Hoangton1210</h5>
          <i className="fas fa-edit"></i>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="note-section">
          <img src="../img/hoangton1.jpg" alt="Note" className="note-image" />
          {/* <!-- <span>Your note</span> --> */}
        </div>
        <div className="message-categories">
          <span className="active">Messages</span>
          <span>Requests (10)</span>
        </div>
        <ul className="message-list-items">
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          {/* <!-- Add more list items for other messages --> */}
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton3.jpg" alt="Tên người nhắn 1" />
            <div className="message-info">
              <h4>Hoàng Tôn</h4>
              <p>Active 31m ago</p>
            </div>
          </li>
          <li>
            <img src="../img/hoangton4.jpg" alt="Tên người nhắn 2" />
            <div className="message-info">
              <h4>Văn Hoàng</h4>
              <p>Active 22m ago</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="message-container" id="message-container">
        <div className="message-header">
          <div className="user-info">
            <a href="homePage.html"><i className="fa-solid fa-arrow-left"></i></a>
            <img
              src="../img/hoangton1.jpg"
              alt="User Avatar"
              className="user-avatar"
            />
            <div>
              <h5 className="mb-0">Hoàng Tôn</h5>
              <span>Active 27m ago</span>
            </div>
          </div>
          <div className="header-icons">
            <i className="fas fa-phone"></i>
            <i className="fas fa-video"></i>
            <i className="fas fa-info-circle"></i>
          </div>
        </div>
        <div className="message-content">
          <div className="message received">
            <p>Tin nhắn 1 .........</p>
            <p>Tin nhắn 2 ..........</p>
            <p>Tin nhắn 3 .........</p>
            <span className="timestamp">1 Feb 2024, 14:50</span>
          </div>
          <div className="message sent">
            <p>Tin nhắn 4 .........</p>
            <p>Tin nhắn 5 .........</p>
            <p>Tin nhắn 6 .........</p>
          </div>
          <div className="message sent">
            <p>Tin nhắn 7 .........</p>
          </div>
          <div className="message received">
            <p>Tin nhắn 8 .........</p>
          </div>
          <div className="message sent">
            <p>Tin nhắn 9 .........</p>
          </div>
          <div className="message received">
            <p>Tin nhắn 10 .........</p>
          </div>
        </div>
        <div className="message-input">
          <input type="text" placeholder="Message..." />
          <i className="far fa-smile"></i>
          <i className="fas fa-microphone"></i>
          <button type="submit"><a href="#">Gửi</a></button>
        </div>
      </div>
        </>
    )
}