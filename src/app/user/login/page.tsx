'use client';
import '../login/login.css';
import Link from 'next/link';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Define types for the form values and possible API responses
interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    _id:string;
    email: string;
    firstName: string;
    lastName: string;
    avata:string
  };
}

interface ErrorResponse {
  message: string;
}

export default function Login() {
  const router = useRouter();
  const [lockedOut, setLockedOut] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);

  // Load login attempts from localStorage on component mount
  useEffect(() => {
    const attempts = Number(localStorage.getItem('loginAttempts')) || 0;
    setLoginAttempts(attempts);
  }, []);

  // Automatically unlock the form after 5 minutes (300 seconds)
  useEffect(() => {
    if (lockedOut) {
      const unlockTimer = setTimeout(() => {
        setLockedOut(false);
        setLoginAttempts(0); // Reset login attempts after lockout period
        localStorage.removeItem('loginAttempts');
      }, 300000); // 5 minutes

      return () => clearTimeout(unlockTimer);
    }
  }, [lockedOut]);

  const handleLoginAttempt = (newAttempts: number) => {
    localStorage.setItem('loginAttempts', newAttempts.toString());
    setLoginAttempts(newAttempts);
  };

  // Formik setup for login form
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
      password: Yup.string().required('Bắt buộc'),
    }),
    onSubmit: async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
      try {
        if (lockedOut) {
          throw new Error('Bạn đã bị khóa vì quá nhiều lần đăng nhập không thành công. Vui lòng thử lại sau.');
        }

        const res = await fetch('http://localhost:4000/account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData: ErrorResponse = await res.json();
          throw new Error(errorData.message || 'Đăng nhập thất bại');
        }

        const data: LoginResponse = await res.json();
        
        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        handleLoginAttempt(0); // Reset attempts on successful login
        router.push('/user/homePage');
        alert('Đăng Nhập thành công!');
        setLoginError(null); // Clear any previous error messages
      } catch (error: any) {
        handleLoginAttempt(loginAttempts + 1);
        if (loginAttempts + 1 >= 3) {
          setLockedOut(true);
          alert('Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau.');
        }
        setLoginError(error.message || 'Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Auto-clear login errors after 5 seconds
  useEffect(() => {
    if (loginError) {
      const errorTimeout = setTimeout(() => {
        setLoginError(null);
      }, 5000);

      return () => clearTimeout(errorTimeout);
    }
  }, [loginError]);

  return (
    <>
      <div className="container" id="loginPage">
        <div className="container_con d-flex">
          <div className="container_left">
            <div className="my-3">
              <h2>Xin chào bạn đã đến với Renet</h2>
            </div>
            <div className="img">
              <img src="../img/khungdienthoai.jpg" alt="" />
              <div className="con">
                <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="/img/screenshot1.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="/img/screenshot2.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="/img/screenshot3.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="/img/screenshot4.png" className="d-block w-100" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 container_right p-0">
            <form onSubmit={formik.handleSubmit}>
              <div className="item-1 m-auto">
                <h2 className="text-center my-4">Renet</h2>

                <div className="mb-2 m-auto">
                  <label>Gmail</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Vui lòng nhập gmail..."
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.email && formik.errors.email ? 'is-invalid' : ''}
                    disabled={lockedOut}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                  ) : null}
                </div>

                <div className="mb-3 m-auto">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Vui lòng nhập mật khẩu..."
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                    disabled={lockedOut}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <span className="text-danger">{formik.errors.password}</span>
                  ) : null}
                </div>

                {loginError && (
                  <div className="text-danger text-center mb-2">
                    {loginError}
                  </div>
                )}

                <div className="quenmatkhau m-auto">
                  <a href="#/" className="text-decoration-none">
                    Quên mật khẩu?
                  </a>
                </div>

                <div className="text-center btnLogin">
                  <button type="submit" disabled={formik.isSubmitting || lockedOut}>
                    <a href="" className='text-decoration-none'>Đăng Nhập</a>
                  </button>
                </div>
              </div>
            </form>

            <div className="item-2 my-4 row">
              <div className="col-4"></div>
              <div className="col-1 p-0 text-center">OR</div>
              <div className="col-4"></div>
            </div>
            <div className="my-3 item-3">
              <button>
                Bạn có tài khoản chưa?
                <Link href='/user/register' className="text-decoration-none">Đăng ký</Link>
              </button>
            </div>
            <div className="my-3 item-4">
              <button className="">
                <div className="img">
                  <img src="../img/facebook.avif" alt="" />
                </div>
                <a href="#">Đăng nhập bằng Facebook</a>
              </button>
            </div>
            <div className="my-3 item-5">
              <button>
                <div className="img">
                  <img src="../img/google.png" alt="" />
                </div>
                <a href="#">Đăng nhập bằng Google</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
