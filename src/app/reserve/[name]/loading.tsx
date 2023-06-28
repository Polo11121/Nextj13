const Loading = () => (
  <>
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <div>
          <div className="animate-pulse bg-slate-200 h-[24px] w-[150px]" />
          <div className="mt-5 flex">
            <div className="w-32 h-18 rounded animate-pulse bg-slate-200" />
            <div className="ml-4">
              <div className="animate-pulse bg-slate-200 h-[38px] w-[300px]" />
              <div className="flex mt-3">
                <div className="mr-6 animate-pulse bg-slate-200 h-[24px] w-[80px]" />
                <div className="mr-6 animate-pulse bg-slate-200 h-[24px] w-[80px]" />
                <div className="mr-6 animate-pulse bg-slate-200 h-[24px] w-[80px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between w-[660px] ">
          <div className="border h-[49px] rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className="border h-[49px] rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className="border h-[49px] rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className="border h-[49px]rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className="border h-[49px] rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className="border h-[49px] rounded p-3 w-80 mb-4 animate-pulse bg-slate-200" />
          <div className=" w-full h-[48px] p-3 rounded animate-pulse bg-slate-200" />
          <div className="mt-4 w-full h-[69px] rounded animate-pulse bg-slate-200" />
        </div>
      </div>
    </div>
  </>
);

export default Loading;
