import React from "react";
import Header from "../components/Header";

function ProblemStatement() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#f0f2f4] ">
      <Header />
      <div className="flex flex-col self-center  items-center mt-12 p-12">
        <h1 className="font-bold text-3xl  ">How Dinder works</h1>
        <div>
          <p className="mt-6 text-lg bg-[#eff8ff] p-12">
            Dinder is a decentralized dating application that aims to provide
            users with a more genuine and authentic dating experience. Unlike
            traditional dating apps that are controlled by a centralized
            authority, Dinder utilizes blockchain technology to create a
            decentralized network where users have more control over their data
            and privacy. One of the key features of Dinder is the use of
            Non-Fungible Tokens (NFTs) to mint unique digital assets for users.
            </p>


            <p className="text-lg bg-[#eff8ff] p-12 pt-0">

            These NFTs can represent special moments or milestones in a user's
            dating journey, such as a first date or a long-term relationship.
            Users can collect and showcase these NFTs as a way to commemorate
            their experiences on the platform. Dinder's decentralized
            architecture also allows users to have more choice and control over
            their matches. Instead of relying on an algorithm to generate
            matches, users can browse through profiles and connect with
            potential partners on their own terms. This allows users to have a
            more personal and authentic dating experience, free from the
            constraints of a centralized authority.

            </p>
         
        </div>
      </div>
    </div>
  );
}

export default ProblemStatement;
