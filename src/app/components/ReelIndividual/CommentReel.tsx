import React from "react";
import Image from "next/image";

interface CommentReelProps {
  onClose: () => void;
}

const CommentReel: React.FC<CommentReelProps> = ({ onClose }) => {
  return (
    <div className="commentReel" id="commentReels">
      <i id="closeCart" onClick={onClose} className="bi bi-x-lg"></i>
      <div className="childcommentReel">
        <div className="detailRight">
          <div className="item">
            <div className="post-images">
              <video controls autoPlay muted>
                <source src="../img/video3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="detailLeft">
          <div className="avatarPost">
            <Image src="../img/hoangton1.jpg" alt="" />
            <a href="#">Hoangton1210</a>
          </div>
          <div className="containerComment">
            {/* Repeat this block for each comment */}
            <div className="commentdetail">
              <div className="avatarUser">
                <div className="img">
                  <Image src="../img/hoangton1.jpg" alt="" />
                </div>
                <div className="content">
                  <a href="#">Hoàng Tôn</a>
                  <label>đẹp trai quá</label>
                </div>
              </div>
              <div className="repComment">
                <span>1 tuần</span>
                <a href="#">Trả lời</a>
              </div>
            </div>
            {/* End of comment block */}
          </div>
          <div className="containerIcon">
            <i className="fa-regular fa-heart"></i>
            <i className="fa-regular fa-comment"></i>
            <i className="fa-regular fa-paper-plane"></i>
            <span className="d-block">1000 lượt thích </span>
          </div>
          <div className="inPutThemBL">
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Thêm bình luận..."
              />
              <i className="fa-solid fa-face-smile"></i>
              <button type="submit">
                <a href="#">Đăng</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReel;
