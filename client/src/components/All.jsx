import React from 'react';

function All() {
  return (
    <div>
      <div className="relative hidden lg:block">
        <div className="absolute left-0 h-full w-1/2 bg-[var(--dark-background-color)]"></div>
        <div className="absolute right-0 h-full w-1/2 bg-[var(--primary-color)]"></div>
        <div className="relative mx-auto w-full">
          <div className="container mx-auto flex">
            <div className="w-3/4 bg-[var(--dark-background-color)] pl-6 xl:pl-12 2xl:pl-36">
              <div className="flex items-center justify-between">
                <div className="py-3">
                  <i className="fa-solid fa-envelope mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                  <span className="text-sm font-thin text-[var(--light-text-color)]">info@bookswaphub.com</span>
                  <span className="mx-4 text-[var(--light-text-color)]">|</span>
                  <i className="fa-solid fa-location-dot mr-4 text-[var(--primary-color)]" aria-hidden="true"></i>
                  <span className="text-sm font-thin text-[var(--light-text-color)]">123 Book Lane. Austin, TX</span>
                </div>
                <div className="h-12 w-10 bg-gradient-to-tr from-[var(--dark-background-color)] from-50% to-[var(--primary-color)] to-50%"></div>
              </div>
            </div>
            <div className="w-1/4 bg-[var(--primary-color)] pr-6 xl:pr-12 2xl:pr-32">
              <div className="flex items-center justify-end py-3">
                <a href="https://facebook.com/bookswaphub" className="mr-3" aria-label="Follow us on Facebook">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]">
                    <i className="fa-brands fa-facebook-f fa-xs text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="https://twitter.com/bookswaphub" className="mr-3" aria-label="Follow us on Twitter">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]">
                    <i className="fa-brands fa-twitter fa-xs text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="https://instagram.com/bookswaphub" className="mr-3" aria-label="Follow us on Instagram">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]">
                    <i className="fa-brands fa-instagram fa-xs text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="https://linkedin.com/company/bookswaphub" className="mr-3" aria-label="Connect with us on LinkedIn">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffff]">
                    <i className="fa-brands fa-linkedin-in fa-xs text-[var(--primary-color)]" aria-hidden="true"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="container mx-auto py-6">
        <div className="flex items-center justify-between relative">
          <div className="pl-6 xl:pl-12 2xl:pl-36">
            <a href="https://app.landingsite.ai/" className="text-xl font-semibold text-[var(--primary-color)] [font-family:var(--font-family-heading)] sm:text-3xl">
              <span>Book Swap Hub</span>
            </a>
          </div>
          <button id="mobile-menu-button" data-collapse-toggle="navigation-menu" type="button" className="pr-6 text-gray-800 lg:hidden" aria-controls="navigation-menu" aria-expanded="false" aria-label="Navigation Menu">
            <i className="fa-regular fa-bars feather feather-menu" data-fontawesome-icon="fa-bars" data-landingsite-gallery-type="icon" aria-hidden="true"></i>
          </button>
          <div id="navigation-menu" className="hidden absolute z-50 left-0 top-full mt-4 w-full bg-[#ffffff] pb-4 lg:pr-6 lg:static lg:mt-0 lg:flex flex-1 lg:items-center lg:justify-between lg:pb-0 xl:pr-12 2xl:pr-36">
            <ul className="flex flex-col lg:px-6 lg:flex-row flex-1 lg:justify-center lg:items-center lg:space-x-6">
              <li className="flex items-center p-2 border-t border-gray-200 lg:border-t-transparent lg:p-0">
                <div className="group relative">
                  <button className="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm flex w-full cursor-pointer flex-row items-center gap-1">
                    <span>About</span>
                    <i className="fa-regular fa-chevron-down ml-1 transition-[&#39;rotate&#39;] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                  </button>
                  <div className="left-0 top-full z-50 hidden w-full lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                    <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/about">About Us</a>
                      <a className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/blog">Blog</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center p-2 border-t border-gray-200 lg:border-t-transparent lg:p-0">
                <div className="group relative">
                  <button className="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm flex w-full cursor-pointer flex-row items-center gap-1">
                    <span>Books</span>
                    <i className="fa-regular fa-chevron-down ml-1 transition-[&#39;rotate&#39;] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                  </button>
                  <div className="left-0 top-full z-50 hidden w-full lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                    <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/swap-books">Swap Books</a>
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/rent-books">Rent Books</a>
                      <a className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/sell-books">Sell Books</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center p-2 border-t border-gray-200 lg:border-t-transparent lg:p-0">
                <div className="group relative">
                  <button className="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm flex w-full cursor-pointer flex-row items-center gap-1">
                    <span>User</span>
                    <i className="fa-regular fa-chevron-down ml-1 transition-[&#39;rotate&#39;] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                  </button>
                  <div className="left-0 top-full z-50 hidden w-full lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                    <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/dashboard">User Dashboard</a>
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/sign-up">Sign Up</a>
                      <a className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/login">Login</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center p-2 border-t border-gray-200 lg:border-t-transparent lg:p-0">
                <div className="group relative">
                  <button className="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm flex w-full cursor-pointer flex-row items-center gap-1">
                    <span>Help</span>
                    <i className="fa-regular fa-chevron-down ml-1 transition-[&#39;rotate&#39;] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                  </button>
                  <div className="left-0 top-full z-50 hidden w-full lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                    <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/faqs">FAQs</a>
                      <a className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/contact">Contact Us</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center p-2 border-t border-gray-200 lg:border-t-transparent lg:p-0">
                <div className="group relative">
                  <button className="text-xs font-semibold uppercase tracking-widest text-[var(--dark-text-color)] 2xl:text-sm flex w-full cursor-pointer flex-row items-center gap-1">
                    <span>Legal</span>
                    <i className="fa-regular fa-chevron-down ml-1 transition-[&#39;rotate&#39;] lg:group-hover:rotate-[180deg]" aria-hidden="true"></i>
                  </button>
                  <div className="left-0 top-full z-50 hidden w-full lg:absolute lg:w-[260px] lg:pt-2 lg:group-hover:block">
                    <div className="mt-2 bg-white p-1.5 lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-sm">
                      <a className="block cursor-pointer border-b border-solid px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/privacy-policy">Privacy Policy</a>
                      <a className="block cursor-pointer px-3 py-1.5 hover:bg-[#1900410a] lg:py-3 lg:font-medium" href="https://app.landingsite.ai/terms-and-conditions">Terms and Conditions</a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex flex-col mt-4 lg:flex-row items-center space-y-4 lg:mt-0 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-button-bg-color)]">
                  <i className="fa-solid fa-phone fa-xl text-[var(--primary-button-text-color)]" aria-hidden="true"></i>
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-medium">Contact Us Today</div>
                  <div className="text-[var(--gray-text-color)]">(555) 123-4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default All;
