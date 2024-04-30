import { PiCaretLeftLight } from "react-icons/pi";
import { PiCaretRightLight } from "react-icons/pi";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { ExpertRatings } from "../Experts/ExpertProfile";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const params = useParams();
  console.log(params);
  const [currBlogData, setCurrBlogData] = useState({});
  const getData = async () => {
    const cookies = document.cookie.split("; ");
    const jsonData = {};

    cookies.forEach((item) => {
      const [key, value] = item.split("=");
      jsonData[key] = value;
    });
    try {
      const res = await axios.get(`/blogs/?action=3&blog_id=${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jsonData.access_token}`,
        },
      });
      const allData = res.data.data;
      setCurrBlogData(allData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="px-[6vw] md:px-[10vw] mt-[110px] md:mt-[12vw]">
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-500 font-semibold">
            {currBlogData?.publish_date}
          </div>
          <div className=" text-3xl overflow-hidden xs:text-4xl lg:text-5xl font-bold md:px-[7vw] my-5 md:my-4 tracking-wide">
            {currBlogData?.title}
          </div>
          <div className="flex items-center justify-center gap-3">
            <img
              src={currBlogData?.author_data?.profile_img}
              alt="profile"
              className="h-10 w-10 rounded-full shrink-0 object-cover "
            />
            <div className="text-sm md:text-base text-gray-500">
              Blog - By {currBlogData?.author_data?.first_name + " " + currBlogData?.author_data?.last_name}
            </div>
          </div>
        </div>

        <div className="my-[3vw]">
          <div>{
            (currBlogData?.images_list?.length)&&
            <img
              className="w-[100%] h-[45vw] object-cover shrink-0"
              src={currBlogData?.images_list[0]}
              alt=""
            />}
          </div>
          <div dangerouslySetInnerHTML={{ __html: currBlogData?.content }} />
        </div>
        {currBlogData?.tags_list?.length >0 && 
        <div className="flex items-center gap-2 flex-wrap my-2">
          
          {currBlogData?.tags_list.map((tag,index)=>
            <div key={index} className="text-[10px] sm:text-sm shrink-0 bg-[#D9D9D9] text-gray-500 border border-solid border-slate-300 rounded-sm px-3 py-1 " >{tag} </div>
        )}
        </div>
        }
        <div className="flex justify-between border-t border-b border-solid border-slate-300 py-[2.5vw] mt-[10vw] md:mt-0 text-[2.2vw] md:text-base">
          <div className="flex items-center gap-[1.5vw] md:gap-[1vw] cursor-pointer">
            <div className="text-xs md:text-[2vw] xl:text-[1.5vw]">
              <PiCaretLeftLight />
            </div>
            <div className="">
              <div>Previous Post</div>
              <div>How to Clean Stainess Steel</div>
            </div>
          </div>
          <div className="flex items-center gap-[1.5vw] md:gap-[1vw] cursor-pointer">
            <div className="">
              <div className="text-right">Next Post</div>
              <div>How to Clean Stainess Steel</div>
            </div>
            <div className="text-xs md:text-[2vw] xl:text-[1.5vw]">
              <PiCaretRightLight />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <ExpertRatings />
        </div>
      </div>
    </>
  );
};
export default BlogDetails;
