import { useState } from "react";
import { useSelector } from "react-redux";
import PasteCard from "../components/ui/PasteCard";
import { IoSearch } from "react-icons/io5";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes);
  const [search, setSearch] = useState("");

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="w-full overflow-hidden py-5">
      <div className="w-10/12 mt-2 relative flex items-center overflow-hidden rounded-full border bg-transparent">
        <div className="py-3 px-6 text-2xl ">
          <IoSearch className="font-semibold" />
        </div>
        <input
          type="search"
          placeholder="Search Pastes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-3 px-5 w-full outline-none bg-transparent"
        />
      </div>
      <div className="w-10/12 flex flex-col justify-start gap-2 mt-4 border rounded-xl bg-zinc-900">
        <h2 className="font-bold text-3xl border-b px-5 py-2">All Pastes</h2>
        <div className="p-4 flex flex-col gap-4 ">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((paste) => {
              return <PasteCard key={paste?._id} paste={paste} />;
            })
          ) : (
            <div className="text-2xl">
              No Paste Found...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pastes;
