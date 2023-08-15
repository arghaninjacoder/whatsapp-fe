import { create } from "zustand"
import axios from "axios"
import { persist } from "zustand/middleware"

const AUTH_API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/auth`

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
}

export const useUser = create(
  persist(
    (set, get) => ({
      ...initialState,

      // actions
      registerUser: async (userData) => {
        set((state) => ({ ...state, status: "loading" }))
        try {
          const { data } = await axios.post(
            `${AUTH_API_ENDPOINT}/register`,
            userData
          )
          set((state) => ({
            ...state,
            user: data.user,
            status: "succeeded",
            error: "",
          }))

          return {
            success: true,
            message: "Registration successful.",
          }
        } catch (err) {
          console.log(err.response.data.error.message)
          set((state) => ({
            ...state,
            status: "failed",
            error: err.response.data.error.message,
          }))

          return {
            success: false,
            message: err.response.data.error.message,
          }
        }
      },

      logout: () => {
        get().reset()
      },
      reset: () => {
        set(initialState)
      },
    }),
    {
      name: "user",
      partialize: (state) => ({ user: state.user }),
    }
  )
)
