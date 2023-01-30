import React from "react";
import Header from "../components/Header";

function ProblemStatement() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f2f4] ">
      <Header />
      <div className="flex flex-col self-center  items-center mt-12 p-12">
        <h1 className="font-bold text-3xl  ">Why did we made dinder ?</h1>
        <div>
          <p className="mt-6 text-lg bg-[#eff8ff] p-12">
            Finding suitable and compatible partners through dating apps can be
            a difficult and time-consuming process, with many users feeling
            frustrated by the lack of accurate and unbiased matches.
            Additionally, existing solutions often fail to provide a seamless
            and user-friendly experience. Our dating application aims to address
            these issues by using cutting-edge technology and algorithms to
            provide more accurate and unbiased matches for users. Furthermore,
            we aim to enhance the user experience by providing a simple and
            easy-to-use interface. As a unique feature, we also plan to mint an
            NFT token for each successful match, adding a fun and engaging
            element to the dating experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProblemStatement;
