import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center my-10">
      <h1 className="inline-block border-r border-black mr-2 py-2 pr-2 font-bold text-2xl">404</h1>
      <div className="inline-block text-left">
        <h2 className="m-0 p-0">This task could not be found</h2>
      </div>
    </div>
  );
}
