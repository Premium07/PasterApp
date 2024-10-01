import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const navigate = useNavigate();

  const createPaste = () => {
    if (!title && !value)
      return toast.error("All fields are required", { position: "top-right" });

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});

    navigate("/pastes");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((item) => item._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <section className="w-full mt-3 flex flex-col items-start gap-2 ">
      <div className="flex items-center gap-2 justify-between w-full">
        <input
          className="py-3 px-5 rounded outline-none w-[85%]"
          type="text"
          placeholder="Enter title here..."
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="py-3 px-8 rounded bg-[#747bff]"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : " Create My Paste"}
        </button>
      </div>
      <div className="w-full">
        <textarea
          className="rounded w-full p-4 outline-none resize-none"
          rows={20}
          placeholder="Enter content here..."
          name="content"
          value={value}
          required
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </section>
  );
};

export default Home;
