import Image from "next/image";
import React from "react";

const TwoColumns = () => {
  return (
    <div className="mb-8 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <Image
          className="rounded-sm"
          alt="about"
          src="/images/about.webp"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">درباره گالری طلای تیداس</h2>
        <p className="text-justify leading-8 text-sm">
          تیداس گالری با داشتن شعبات مختلف در شهر تهران، آماده ارائه خدمت به شما
          عزیزان می باشد. تیداس گالری با داشتن شعبات مختلف در شهر تهران، آماده
          ارائه خدمت به شما عزیزان می باشد. تیداس گالری با داشتن شعبات مختلف در
          شهر تهران، آماده ارائه خدمت به شما عزیزان می باشد.
        </p>
      </div>
    </div>
  );
};

export default TwoColumns;
