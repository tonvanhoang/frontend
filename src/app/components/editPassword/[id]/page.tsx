'use client'
import '../../editPassword/[id]/editProfile.css'
import Link from 'next/link'
import React, { useEffect, useState } from "react"
export default function EditName({ params }: { params: { id: string } }) {
  const [account, setAccount] = useState<any>(null)
  const [password, setpassword] = useState('') // Đổi tên biến setFirstName
  // Fetch dữ liệu tài khoản khi component được mount
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetch(`http://localhost:4000/account/accountByID/${params.id}`)
      const data = await res.json()
      setAccount(data)
      setpassword(data.password)
      console.log(data)
    }
    fetchAccount()
  }, [params.id])

  // Hàm xử lý khi nhấn nút Cập nhật
  const btnName = async (idacc: string, e: React.FormEvent) => {
    e.preventDefault() // Ngăn chặn hành động mặc định của form
    const newdata = {
        password:password
    }
    const res = await fetch(`http://localhost:4000/account/editPassword/${idacc}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newdata)
    })

    if (res.ok) {
      alert('Cập nhật thành công')
      location.href=`/user/editProfilePage/${idacc}`
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  return (
    <>
      {
        account && (
          <div id="formEditPro">
            {/* Nút đóng */}
            <Link href={`/user/editProfilePage/${account._id}`}>
              <i id="closeCart" className="bi bi-x-lg"></i>
            </Link>
            {/* Form chỉnh sửa tên */}
            <form>
              <h4>Thay đổi họ tên tài khoản</h4>
              <hr />
              {/* Input cho họ */}
              <div className="mb-3 Input">
                <label className="form-label">Nhập họ của bạn</label>
                <input
                  type="text"
                  className="form-control"
                  value={password} // Lấy giá trị từ state firstName
                  onChange={(e) => setpassword(e.target.value)} // Cập nhật state firstName khi người dùng thay đổi
                  placeholder="Vui lòng nhập họ"
                />
                <div className="text-danger d-none">Vui lòng nhập họ</div>
              </div>

              {/* Nút cập nhật */}
              <div className="mb-3 btncapnhat">
                <button type='submit' onClick={(e) => btnName(account._id, e)}>Cập nhật</button>
              </div>
            </form>
          </div>
        )
      }
    </>
  )
}
