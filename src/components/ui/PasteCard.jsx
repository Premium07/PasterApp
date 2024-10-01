/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdIosShare } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { removeFromPastes } from "../../redux/pasteSlice";
import { SlCalender } from "react-icons/sl";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const PasteCard = ({ paste }) => {
  const dispatch = useDispatch();

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Website",
          text: "Check out this awesome site!",
          url: "https://www.example.com", // Replace with your website or specific URL
        })
        .then(() => console.log("Successfully shared!"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  // console.log(paste);
  return (
    <div className=" px-4 py-2 w-full flex items-start gap-5 justify-between border rounded ">
      <div className=" flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-ellipsis">{paste?.title.toUpperCase()}</h2>
        <p className="text-sm text-justify text-ellipsis">{paste?.content}</p>
      </div>
      <div className="flex flex-col gap-4 w-1/4 py-1">
        <div className="flex gap-3 items-center">
          <NavLink
            to={`/?pasteId=${paste?._id}`}
            className="size-10 border rounded flex items-center justify-center text-lg bg-zinc-950"
          >
            <RiEditLine />
          </NavLink>

          <button
            className="size-10 border rounded p-2 flex items-center justify-center text-lg bg-zinc-950"
            onClick={() => handleDelete(paste?._id)}
          >
            <MdOutlineDeleteOutline />
          </button>
          <button
            className="size-10 border rounded p-2 flex items-center justify-center text-lg bg-zinc-950"
            onClick={handleShare}
          >
            <MdIosShare />
          </button>
          <button>
            <NavLink
              to={`/pastes/${paste._id}`}
              className="size-10 border rounded p-2 flex items-center justify-center text-lg bg-zinc-950"
            >
              <FaRegEye />
            </NavLink>
          </button>
          <button
            className="size-10 border rounded p-2 flex items-center justify-center text-lg bg-zinc-950"
            onClick={() => {
              navigator.clipboard.writeText(paste?.content);
              toast.success("Copied to clipboard", { position: "top-right" });
            }}
          >
            <MdOutlineContentCopy />
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <SlCalender className="text-[#747bff]" />
          <p className="font-semibold text-sm text-zinc-400">
            {paste.createdAt}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasteCard;
