import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";

// import { addToPastes, updateToPastes } from "../redux/pasteSlice";
// import toast from "react-hot-toast";

const SinglePaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <section className="w-full mt-3 flex flex-col items-start gap-2 ">
      <div className="flex items-center gap-2 justify-between w-full">
        <input
          className="py-3 px-5 rounded outline-none w-[80%] disabled:cursor-not-allowed"
          type="text"
          placeholder="Enter title here..."
          name="title"
          value={paste?.title.toUpperCase()}
          disabled
          required
          // onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-[20%] py-3 px-4 rounded bg-[#2b2b2b] flex items-center justify-end gap-2">
          <SlCalender />
          <span>{paste?.createdAt}</span>
        </div>
      </div>
      <div className="w-full relative bg-[#2b2b2b] flex flex-col p-[1px] rounded-md overflow-hidden">
        <div className="w-full flex items-center justify-end rounded-2xl">
          <div
            className=" text-xl p-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(paste?.content);
              toast.success("Content Copied", { position: "top-right" });
            }}
          >
            <IoCopyOutline title="copy"/>
          </div>
        </div>
        <textarea
          className="rounded w-full p-4 outline-none bg-zinc-900 resize-none disabled:cursor-not-allowed"
          rows={20}
          placeholder="Enter content here..."
          name="content"
          value={paste?.content}
          disabled
          required
          // onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default SinglePaste;
