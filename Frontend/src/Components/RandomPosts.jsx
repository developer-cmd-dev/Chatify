import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import SearchInput from "./SearchInput";

function RandomPosts() {
  const [posts, setPosts] = useState([]);
  const target = useRef(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);

  const fetchImages = async (searchValue) => {
    try {
      setLoading(true);
      console.log('function calling')
      const postArr = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pages}&query=${search} &client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }
        `
      );
      setLoading(false);
      setPosts((prev) => [...prev, ...postArr.data.results]);
      setPages((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search) {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          entries.forEach((entry) => {
            fetchImages();
          });
        }
      },
      {
        threshold: 0.8,
      }
    );
    if (target.current) {
      observer.observe(target.current);
    }
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [loading]);

  const handleSearch = () => {
    setPosts([])
    fetchImages(search)
  };

  return (
    <div className="ChatContainer  bg-[#110D24] rounded-[30px] h-full w-[750px] flex flex-col items-center justify-center p-4 ">
      <div className="user rounded-2xl mb-2 flex items-center justify-between w-full h-20 bg-[#1B1338] ">
        <div className="h-full w-[70%]  flex items-center text-white ">
          <div className="  w-[17%] flex items-center justify-center h-full">
            <img
              src="./public/logo/unsplash.png"
              className="rounded-full w-14"
              alt=""
            />
          </div>

          <div className=" text-lg">
            <h1>Unsplash pics</h1>
          </div>
        </div>

        <div className="w-fit  h-full  flex items-center justify-center">
          <div className="bg-[#241A4B] w-36 mx-3 h-[50%] rounded-xl text-white flex items-center justify-around text-2xl">
            <button onClick={handleSearch}>
              <CiSearch />
            </button>
            <input
              type="text"   
              placeholder="@search "
              className=" bg-transparent w-[70%] text-sm h-full outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className=" w-full h-full overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-slate-950">
        <div
          id="observer"
          className="posts flex flex-col items-center  justify-start "
        >
          {posts.map((post, index) => (
            <div key={index} className=" m-4 w-fit">
              <div className="postImage h-fit   flex items-center justify-center">
                <img className="w-[35vw]" src={post.urls.regular} alt="" />
              </div>
              <div className=" h-12 text-white flex items-center justify-around text-2xl">
                <CiHeart />
                <GoComment />
                <CiBookmark />
              </div>
            </div>
          ))}
          <div ref={target} style={{ height: "20px", width: "100%" }}></div>
        </div>
      </div>
    </div>
  );
}

export default RandomPosts;
