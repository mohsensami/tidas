import Image from "next/image";
import loader from "@/assets/loading.svg";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="text-4xl font-bold shine">Tidas Gold Galery</div>
    </div>
  );
};

export default Loading;
