"use client";

function Footer() {
  return (
    <div
      id="footer"
      className="sticky bottom-0 -z-1 bg-[rgb(44,24,16)] text-[rgb(194,152,135)] p-3 flex py-5 flex-col md:flex-row gap-3 items-center justify-around"
    >
      <div>
        <h1 className="text-[rgb(237,207,132)] text-xl text-center">
          Hisab <span className="text-[rgb(240,175,8)] ">Kitab</span>
        </h1>
        <h1>Contact Us : realme19948@gmail.com</h1>
      </div>
      <p className="text-center">
        Manage your land, your workers, your earnings — all in one place.
      </p>
      <p>© 2026 HisabKitab</p>
    </div>
  );
}

export default Footer;
