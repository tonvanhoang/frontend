'use client'
import '../../editPhone/[id]/editProfile.css'
import Link from 'next/link'
import React, { useEffect, useState } from "react"
export default function EditPhone({ params }: { params: { id: string } }) {
  const [account, setAccount] = useState<any>(null)
  const [phoneNumber, setphoneNumber] = useState('') // Đổi tên biến setFirstName

  // Fetch dữ liệu tài khoản khi component được mount
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetch(`http://localhost:4000/account/accountByID/${params.id}`)
      const data = await res.json()
      setAccount(data)
      setphoneNumber(data.phoneNumber)
      console.log(data)
    }
    fetchAccount()
  }, [params.id])

  // Hàm xử lý khi nhấn nút Cập nhật
  const btnName = async (idacc: string, e: React.FormEvent) => {
    e.preventDefault() // Ngăn chặn hành động mặc định của form
    const newdata = {
     phoneNumber:phoneNumber
    }
    const res = await fetch(`http://localhost:4000/account/editPhone/${idacc}`, {
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
              <h4>Thay đổi số điện thoại</h4>
              <hr />

              {/* Input cho họ */}
              <div className="mb-3 Input">
                <label className="form-label">Nhập số điện thoại mới</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber} // Lấy giá trị từ state firstName
                  onChange={(e) => setphoneNumber(e.target.value)} // Cập nhật state firstName khi người dùng thay đổi
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
