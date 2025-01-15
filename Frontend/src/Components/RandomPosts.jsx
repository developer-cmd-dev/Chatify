import React, { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { Blurhash } from "react-blurhash";
import { Separator } from "@/components/ui/separator";

function RandomPosts() {
  const [posts, setPosts] = useState([]);
  const target = useRef(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [imageLoaded, setImageLoaded] = useState([]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const postArr = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pages}&query=${
          !search ? "motivational quotes" : search
        } &client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}
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
    setImageLoaded(Array(posts.length).fill(false));
}, [posts])
  

  useEffect(() => {
    const loadImage = (index) => {
      const img = new Image();
      img.src = posts[index].urls.regular;
      img.onload = () => {
        setImageLoaded((prevImg) =>
          prevImg.map((loaded, i) => (i === index ? true : loaded))
        );
      };
    };
    posts.forEach((_, index) => loadImage(index));
  }, [posts]);

  useEffect(() => {
    if (!search) {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          entries.forEach(() => {
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
    setPosts([]);
    fetchImages();
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
          <div className="bg-[#241A4B]  w-36 mx-3 h-[50%] rounded-xl text-white flex items-center justify-around text-2xl">
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
            <div
              key={index}
              className=" bg-[#1B1338]  rounded-xl m-4 w-fit flex flex-col items-center justify-center"
            >
              <div className="postImage h-fit   flex items-center justify-center">
                {imageLoaded[index] ? (
                  <img className="w-[35vw]" src={post.urls.regular} alt="" />
                ) : (
                  <Blurhash hash={post.blur_hash} width={600} height={400} />
                )}
              </div>
              <div className=" h-10 text-white flex items-center w-[90%] ">
                <p className="text-sm opacity-30">@{post.user.username}</p>
              </div>
              <Separator className=" bg-slate-800" />
              <div className=" h-12 w-full text-white flex items-center justify-around text-2xl">
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
