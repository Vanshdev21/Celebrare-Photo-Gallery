import { Image as ImageIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ImageIcon size={21} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Photo Gallery</h1>
            <p className="text-xs text-slate-500">
              A little inspiration, frame by frame
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Picsum Photos
        </div>
      </div>
    </header>
  );
};

export default Header;
