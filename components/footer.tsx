import { APP_NAME } from "../lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center text-xs">
        {currentYear} {APP_NAME}. کليه حقوق محصولات و محتوای اين سایت متعلق به
        تیداس است.
      </div>
    </footer>
  );
};

export default Footer;
