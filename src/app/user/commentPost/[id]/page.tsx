
import React, { FormEvent, useEffect, useState } from "react"
import ShowAccount from "../../componentAccount/image";
import ShowName from "../../componentAccount/name";
import Link from "next/link";
import { toast } from "react-toastify";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avata:string
}
export default function CommentPost({params}:{params:{id:string}}){
  const [user,setUser] = useState<User|null>(null)
    const [comments,setComments] = useState<any>([])
    const [comment,setComment] = useState('');
    const [likes, setLikes] = useState<{ [key: string]: { count: number; likedBy: string[] } }>({}); // Lưu trữ số lượt thích và người dùng đã thích
    const [post,setPost] = useState<any>(null)
        const fetchComment = async ()=>{
            const res = await fetch(`http://localhost:4000/comment/commentByPost/${params.id}`)
            const data = await res.json()
            setComments(data)
          }
        useEffect(()=>{
          fetchComment()
        },[params.id])
        // local tài khoản
        useEffect(()=>{
          const showData = localStorage.getItem('user')
          if(showData){
            setUser(JSON.parse(showData))
          }
        },[])
    const addComment = async (e:React.FormEvent)=>{
      e.preventDefault();
      const newComment = {
      comment,
      idPost:params.id,
      idAccount:user?._id
    }
    const res = await fetch("http://localhost:4000/comment/addpost",{
    method:"POST",
    headers:{
    "content-Type":"application/json"
    },
    body:JSON.stringify(newComment)
    });
    if(res.ok){
      fetchComment()
      // setComment('')
      const resPostDetail = await fetch(`http://localhost:4000/post/postByID/${params.id}`)
      const dataPost = await resPostDetail.json()
      const newNoTi = {
        owner:user?._id,
        idAccount:dataPost.idAccount,
        content:"Đã Bình luận bài viết của bạn"
      }
      const resNoti = await fetch(`http://localhost:4000/notification/addPost`,{
        headers:{
          'content-type':'application/json'

        },
        method:'POST',
        body:JSON.stringify(newNoTi)
      })
    }
  }
  const clickFavorite = async (id: string) => {
    if (!user) {
        toast.error('Bạn cần đăng nhập để thích bài viết.');
        return;
    }
    // Lấy số lượt thích hiện tại và đảm bảo likedBy luôn là mảng
    const currentLikes = likes[id] || { count: 0, likedBy: [] };
    const likedBy = Array.isArray(currentLikes.likedBy) ? currentLikes.likedBy : []; // Đảm bảo likedBy là mảng
    const alreadyLiked = likedBy.includes(user._id); // Kiểm tra nếu user đã thích bài viết

    let newLikes;

    if (alreadyLiked) {
        // Nếu đã thích, trừ đi lượt thích
        newLikes = {
            count: currentLikes.count - 1,
            likedBy: likedBy.filter(userId => userId !== user._id), // Xóa user ra khỏi danh sách
        };
        toast.success('Đã bỏ thích bài viết.');
    } else {
        // Nếu chưa thích, tăng lượt thích
        newLikes = {
            count: currentLikes.count + 1,
            likedBy: [...likedBy, user._id], // Thêm user vào danh sách
        };
        toast.success('Đã thích bài viết.');
    }

    // Cập nhật state và localStorage
    const updatedLikes = { ...likes, [id]: newLikes };
    setLikes(updatedLikes);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));

    // Gọi API để thêm hoặc bỏ thích (nếu cần)
    const newFavorite = {
        idAccount: user._id,
        idPost: id,
        action: alreadyLiked ? 'remove' : 'add', // Thêm hoặc bỏ
    };
    const res = await fetch(`http://localhost:4000/favorite/${alreadyLiked ? 'removePost' : 'addPost'}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(newFavorite)
    });

    if (!res.ok) {
        toast.error('Thao tác yêu thích thất bại.');
    }
    if(res.ok){
      const resPostDetail = await fetch(`http://localhost:4000/post/postByID/${id}`)
      const dataPost = await resPostDetail.json()
      const newNoTi = {
        idAccount:dataPost.idAccount,
        idPost:dataPost._id,
        owner:user._id,
        content:"Đã yêu thích bài viết của bạn❤️"
      }
      const resNoti = await fetch(`http://localhost:4000/notification/addPost`,{
        headers:{
          'content-type':'application/json'

        },
        method:'POST',
        body:JSON.stringify(newNoTi)
      })
    }
};
  useEffect (()=>{
    const fetchAccount  = async ()=>{
      const res = await fetch(`http://localhost:4000/post/postByID/${params.id}`)
      const data = await res.json()
      setPost(data)
       // Khôi phục số lượt thích từ localStorage
       const storedLikes = localStorage.getItem('likes');
       if (storedLikes) {
         setLikes(JSON.parse(storedLikes));
       }
    }
    fetchAccount()
  },[params.id])
  // báo cáo
  const btnReport = async (e:React.FormEvent) =>{
    const resPost = await fetch(`http://localhost:4000/post/postByID/${params.id}`)
    const dataPost = await resPost.json()
    e.preventDefault()
    const newData = {
      idAccount:user?._id,
      idPost:params.id,
      owner:dataPost.idAccount,
      content:"Xem xét nội dung bài viết có nội dung phản cảm!"
    }
    if(user?._id===dataPost.idAccount){
      alert('Bạn không thể tự báo cáo bài viết của mình!')
    }
    else{
      const res = await fetch(`http://localhost:4000/report/add`,{
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(newData),
        method:'POST'
      })
      if(res.ok){
        alert('Bạn đã báo cáo bài viết thành công')
      }
    }
    
  }
    return(
        <>
        {/* Phần bình luận */}
        <div className="detailLeft">
          {
            post && (
              <>
              <div className="avatarPost">
                <div className="d-flex justify-content-between">
                <div>
                <ShowAccount params={{id:post.idAccount}} />
                <ShowName params={{id:post.idAccount}}/>
                </div>
                <div>
                <button type="button" className="bg-danger text-white border py-1 px-3 mx-2 btn-Report" onClick={btnReport}>Báo cáo</button>
              </div>
                </div>
              </div>
              </>
            )
          }
          <div className="containerComment">
          {
            comments.map((cmt:any)=>(
            <>
              <div className="commentdetail" key={cmt._id}>
                <div className="avatarUser">
                  <div className="img">
                    <ShowAccount params={{ id: cmt.idAccount }}/>
                  </div>
                  <div className="content">
                    <Link href={`/user/profilePage/${cmt.idAccount}`}><ShowName params={{id:cmt.idAccount}}/></Link>
                    <label>{cmt.comment}</label>
                  </div>
                </div>
                <div className="repComment">
                  <span>{cmt.dateComment}</span>
                  <a href="#">Trả lời</a>
                </div>
              </div>
            </>
            ))
          }
             </div>
          {
            post && (
              <>
              <div className="containerIcon">
            <i className="fa-regular fa-heart" onClick={() => clickFavorite(post._id)}></i>
            <i className="fa-regular fa-comment"></i>
            <i className="fa-regular fa-paper-plane"></i>
            <span className="d-block">
            {likes[post._id]?.count || 0} lượt thích
            </span>
          </div>
          <div className="inPutThemBL">
            <div className="d-flex">
              <input onChange={(e)=>setComment(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Thêm bình luận..."

              />
              <i className="fa-solid fa-face-smile"></i>
              <button type="submit" onClick={addComment}><a href="#">Đăng</a></button>
            </div>
          </div>
              </>
            )
          }
        </div>
        </>
    )
}