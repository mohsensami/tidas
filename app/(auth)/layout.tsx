const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:grid md:grid-cols-12 min-h-screen">
      {/* <div className="flex-center min-h-screen w-full grid grid-col-12"> */}
      <div className="col-span-12">{children}</div>
      {/* <div className="col-span-6 bg-[url(/images/login.jpg)] bg-bottom-right"></div> */}
    </div>
  );
};
export default Layout;
