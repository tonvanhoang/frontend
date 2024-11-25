// UploadPost.tsx (Client Side - React TSX)
'use client';
import { useEffect, useState } from 'react';
import '../formAddPost/formadd.css'
import Nav from '../navbar/page';
interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avata: string;
}

export default function UploadPost() {
  const [title, setTitle] = useState<string>(''); // State quản lý tiêu đề bài viết
  const [files, setFiles] = useState<File[]>([]); // State quản lý danh sách ảnh
  const [user, setUser] = useState<User | null>(null); // State quản lý thông tin người dùng

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const dataUser = localStorage.getItem('user');
    if (dataUser) {
      const parsedUser: User = JSON.parse(dataUser);
      setUser(parsedUser); // Lưu thông tin người dùng vào state
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // Lấy danh sách file từ input
      setFiles(filesArray); // Lưu file vào state
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert('Chưa đăng nhập!');
      return;
    }

    const formData = new FormData();
    console.log("id",user._id)
    formData.append('title', title); // Gửi tiêu đề bài viết
    formData.append('idAccount', user._id); // Gửi ID tài khoản đang đăng nhập
    files.forEach((file) => {
      formData.append('post', file); // Gửi từng file ảnh với key 'post'
    });

    try {
      const response = await fetch('http://localhost:4000/post/add', { // Gửi yêu cầu tới API thêm bài viết
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi');
      }

      alert('Bài viết đã được tải lên thành công!');
      setTitle(''); // Đặt lại tiêu đề
      setFiles([]); // Xóa danh sách ảnh
      location.href="/user/homePage"
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Đã xảy ra lỗi khi upload bài viết');
    }
  };

  return (
   <>
    <Nav/>
    <div id="formadd">
      <form onSubmit={handleSubmit}>
      <div className='caption'>
        <label>Nhập captionnnn</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Chọn ảnh từ máy:</label>
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange} 
          required 
        />
      </div>
      <button type="submit">Đăng bài</button>
    </form>
    </div>
   </>
  );
}
