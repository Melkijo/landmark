"use client";
import React, { useEffect, useState } from "react";

import { supabase } from "@/lib";
import Sidebar from "@/components/sidebar";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState("");

  const requestAccount = async () => {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  useEffect(() => {
    requestAccount();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    // const thumbnail: any = e.target.thumbnail.files[0];

    // const imgUpload = await supabase.storage
    //   .from("landmark")
    //   .upload(`certificate/${thumbnail.name}`, thumbnail, {
    //     cacheControl: "3600",
    //     upsert: true,
    //   });

    if (!file) return;
    try {
      const data = new FormData();

      data.append("file", file);
      const metadata = JSON.stringify({
        name: file.name,
      });
      data.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      data.append("pinataOptions", options);

      const res = await fetch("/api/ipfs", {
        method: "POST",
        body: data,
      });
      // handle the error
      //   if (!res.ok) throw new Error(await res.text());

      const json = await res.json();

      setImgUrl(json.ipfsHash);

      console.log(json.ipfsHash);

      if (imgUrl !== "") {
        //   const imgUrl = supabase.storage
        //     .from("landmark")
        //     .getPublicUrl(imgUpload.data.path);
        console.log(imgUrl);
        const data = {
          owner: String(e.target.name.value),
          location: String(e.target.location.value),
          description: String(e.target.desc.value),
          date: String(e.target.date.value),
          thumbnail: imgUrl,
          owner_id: walletAddress,
        };
        console.log(data);

        const res = await fetch("/api/land-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });
        const resPost = await res.json();
        if (resPost.message) {
          setLoading(false);
        }
        alert(resPost.message);
      } else {
        alert("Upload image first");
        setLoading(false);
      }
    } catch (e: any) {
      // Handle errors here
      console.error(e);
      setLoading(false);
    }
  }
  return (
    <Sidebar>
      <div>
        <h1 className="text-[2rem] mx-5">Add Certificate</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 my-5 mx-5">
            <div className="basis-1/2 flex flex-col gap-5">
              <div>
                <label htmlFor="">Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Type here"
                  name="name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="">Date</label>
                <br />
                <input
                  key="outside"
                  type="date"
                  className="input input-bordered w-full "
                  name="date"
                />
              </div>
              <div>
                <label htmlFor="file-input">envidence</label>
                <br />
                <input
                  type="file"
                  name="thumbnail"
                  id="file-input"
                  className="file-input file-input-bordered w-full "
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </div>

              <div>
                <label htmlFor="">Location</label>
                <br />
                <input
                  type="text"
                  name="location"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="basis-3/4 h-fit">
              <div>
                <label htmlFor="">Description</label>
                <br />
                {/* <Textarea
                        name="desc"
                        variant="bordered"
                        size="lg"
                        className="bg-white max-w-full h-[200px] pt-2"
                        placeholder="Enter your description"
                        required
                     /> */}
                <textarea
                  name="desc"
                  className="textarea textarea-bordered h-[325px] w-full"
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-start mx-5">
            <button type="submit" className="btn btn-accent" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}
