import { useRef } from "react"
import { toast } from "react-hot-toast"

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
  const inputRef = useRef()

  const handlePicture = (e) => {
    let pic = e.target.files[0]
    if (
      pic.type !== "image/jpeg" &&
      pic.type !== "image/webp" &&
      pic.type !== "image/png" &&
      pic.type !== "image/jpg"
    ) {
      toast.error("Unsupported image format.")
      return
    } else if (pic.size > 1024 * 1024 * 5) {
      toast.error("Image size must be lower than 5mb.")
      return
    } else {
      setPicture(pic)
      // reading the picture
      const reader = new FileReader()
      reader.readAsDataURL(pic)
      reader.onload = (e) => {
        setReadablePicture(e.target.result)
      }
    }
  }

  const handleChangePic = () => {
    setPicture("")
    setReadablePicture("")
  }

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>

      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="Picture"
            className="h-20 w-20 object-cover rounded-full"
          />
          {/* change pic */}
          <div
            className="mt-2 py-1 w-20 dark:bg-dark_bg_3 rounded-md text-xs flex items-center justify-center cursor-pointer"
            onClick={handleChangePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/*"
        onChange={handlePicture}
      />
    </div>
  )
}
export default Picture
