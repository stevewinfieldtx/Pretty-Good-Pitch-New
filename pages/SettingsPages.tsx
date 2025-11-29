import React from 'react';

export const CompanyProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-wrap justify-between gap-3 pb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Company Profile</h1>
          <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">Enter your company details to generate your sales intelligence report.</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col w-full">
              <p className="text-[#111318] dark:text-gray-100 text-base font-medium leading-normal pb-2">Company Name</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal" placeholder="e.g. Acme Inc." />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-[#111318] dark:text-gray-100 text-base font-medium leading-normal pb-2">Company URL</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal" placeholder="e.g. https://acme.com" />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col w-full">
              <p className="text-[#111318] dark:text-gray-100 text-base font-medium leading-normal pb-2">City/State</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal" placeholder="e.g. San Francisco, CA" />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-[#111318] dark:text-gray-100 text-base font-medium leading-normal pb-2">Company Type</p>
              <div className="relative w-full">
                <select className="appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111318] dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbdfe6] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#616f89] p-[15px] text-base font-normal leading-normal pr-10">
                  <option disabled selected>Select a type</option>
                  <option>Pure Reseller</option>
                  <option>Value Added Reseller</option>
                  <option>System Integrator</option>
                  <option>MSP</option>
                  <option>MSSP</option>
                  <option>Other</option>
                </select>
                <span className="material-symbols-outlined absolute top-1/2 right-4 -translate-y-1/2 text-[#616f89] dark:text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </label>
          </div>
          <div className="pt-4 flex justify-end">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark" type="submit">
              <span className="truncate">Create/View Analysis</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-wrap justify-between gap-3 pb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">My Profile</p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage your personal and professional information.</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex gap-4 items-center">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-1VTuGUbhn04psL9-hq6Is7nz7LlH_GowdKsVUJTPJiD0eRSEIKmmjshLDdUSxUfXA2AIRcO1rIedDGyh-rUZavnAwspvDr03vPtlVWU4cBrUdvuEYKtIQuGsILjjXvYK5NdTjpfw_jpTjP0P2mTqzAbGjFtNpt4jIFj2439TW7pFN8wKJlwlkveQvhH8-J4g007T4-6Qmy_XHM_sE28EvX4btGuPTxHCZ5O9FReXbocxNekUuqKvHMqQ5BQyY8ajTDkwYtuzBaM")' }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">john.doe@example.com</p>
              </div>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="truncate">Upload Photo</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="flex flex-col">
              <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">First Name</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 h-11 placeholder:text-gray-400 p-3 text-sm font-normal leading-normal" defaultValue="John"/>
            </label>
            <label className="flex flex-col">
              <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">Last Name</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 h-11 placeholder:text-gray-400 p-3 text-sm font-normal leading-normal" defaultValue="Doe"/>
            </label>
            <label className="flex flex-col">
              <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">Job Title</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 h-11 placeholder:text-gray-400 p-3 text-sm font-normal leading-normal" defaultValue="Sales Manager"/>
            </label>
            <label className="flex flex-col">
              <p className="text-gray-900 dark:text-white text-sm font-medium leading-normal pb-2">Company</p>
              <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 h-11 placeholder:text-gray-400 p-3 text-sm font-normal leading-normal" defaultValue="Acme Corporation"/>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium leading-normal tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700">
              <span className="truncate">Cancel</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal tracking-wide hover:bg-primary/90">
              <span className="truncate">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};