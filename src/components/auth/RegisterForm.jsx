import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { PulseLoader } from "react-spinners"
import { useState } from "react"

import { signUpSchema } from "../../utils/validation"
import AuthInput from "./AuthInput"
import { useUser } from "../../hooks/useUser"
import Picture from "./Picture"
import axios from "axios"

const cloud_secret = import.meta.env.VITE_CLOUD_SECRET
const cloud_name = import.meta.env.VITE_CLOUD_NAME

const RegisterForm = () => {
  const navigate = useNavigate()
  const { registerUser, status } = useUser()
  const [picture, setPicture] = useState()
  const [readablePicture, setReadablePicture] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = async (data) => {
    let res
    if (picture) {
      // upload to cloudinary then register
      await uploadImage().then(async (value) => {
        res = await registerUser({ ...data, picture: value.secure_url })
      })
    } else {
      res = await registerUser({ ...data, picture: "" })
    }
    if (res.success) {
      navigate("/")
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  const uploadImage = async () => {
    let formData = new FormData()
    formData.append("upload_preset", cloud_secret)
    formData.append("file", picture)
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    )
    console.log(data)
    return data
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* hidden */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setPicture={setPicture}
          />

          <button
            type="submit"
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
          font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={14} />
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link
              to="/login"
              className=" hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default RegisterForm
