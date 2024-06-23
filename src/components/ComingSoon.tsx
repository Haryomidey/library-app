import React from "react";

function ComingSoon() {
  return (
    <div className="-z-10 text-center fixed h-[calc(100vh-4rem)] w-screen">
      <div className="absolute w-full flex h-full [&>*]:object-cover justify-between [&>*]:opacity-40 overflow-x-hidden">
        <img src="/images/leftLoginBackground.png" alt="" className="-z-10" />
        <img src="/images/rightLoginBackground.png" alt="" className="-z-10" />
      </div>
      <div className="flex flex-col py-20  gap-10  mx-auto w-11/12 lg:w-8/12 ">
        <h1 className="text-5xl lg:text-7xl font-light">COMING SOON</h1>
        <p className="font-medium">
          Exciting news! We're hard at work developing a fantastic new feature
          for you. Stay tuned as we put the finishing touches. Coming soon to
          enhance your experience!
        </p>
        <button className="bg-slate-700 text-white mx-auto w-fit self-center text-lg px-14 py-3">
          Back Home
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
