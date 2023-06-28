import { Header } from "@/homePage/components";

const Loading = () => (
  <main>
    <Header />
    <div className="py-3 px-36 flex flex-wrap justify-center">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-slate-200 w-64 h-72 m-3 overflow-hidden rounded border cursor-pointer"
        />
      ))}
    </div>
  </main>
);

export default Loading;
