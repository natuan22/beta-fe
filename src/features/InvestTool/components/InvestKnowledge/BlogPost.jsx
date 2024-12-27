import { Button } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { formatTitle } from "../../../../helper/formatTitle";
import { getApi } from "../../../../helper/getApi";
import { resourceURL } from "../../../../services/config";

moment.updateLocale("vi", {
  weekdays: [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ],
  weekdaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  months: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthsShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
});

const BlogPost = () => {
  const { id } = useParams();
  const [dataPost, setDataPost] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState(null);
  const [visibleBlogsCount, setVisibleBlogsCount] = useState(3);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleShowMore = () => {
    setVisibleBlogsCount((prevCount) => prevCount + 3);
  };

  const fetchDataPost = async (id) => {
    try {
      const dataPost = await getApi(`/api/v1/blogs-user/post/${id}`);
      setDataPost(dataPost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPost(id);
  }, [id]);

  const fetchDataPostWithTags = async (tags) => {
    try {
      const tagsString = tags.join(",");
      const relatedBlogs = await getApi(
        `/api/v1/blogs-user/post?tags=${tagsString}`
      );

      return relatedBlogs;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAndSetRelatedBlogs = async () => {
      if (dataPost && dataPost.tags && dataPost.tags.length > 0) {
        try {
          const relatedBlogs = await fetchDataPostWithTags(
            dataPost.tags.map((item) => item.name)
          );
          const filteredBlogs = relatedBlogs.filter(
            (item) => item.id !== Number(dataPost.id)
          );

          setRelatedBlogs(filteredBlogs);
        } catch (error) {
          console.error("Error fetching related blogs:", error);
        }
      }
    };

    fetchAndSetRelatedBlogs();
  }, [dataPost]);

  const addClassToImages = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Lấy tất cả các thẻ <img> và thêm class vào mỗi thẻ <img>
    const images = doc.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add(
        "my-1",
        "block",
        "float-none",
        "align-top",
        "relative",
        "max-w-[100%]"
      );
    });

    // Lấy tất cả các thẻ <p> và kiểm tra nếu chúng chứa thẻ <img>, nếu có thì thêm class vào thẻ <p>
    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach((p) => {
      if (p.querySelector("img")) {
        p.classList.add("flex", "justify-center");
      }
      p.classList.add("my-4");
    });

    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((h) => {
      h.classList.add("my-4");
    });

    const ulTag = doc.querySelectorAll("ul");
    ulTag.forEach((ul) => {
      ul.classList.add("my-4");
      ul.classList.add("px-10");
    });

    // Trả về nội dung HTML đã thay đổi
    return doc.body.innerHTML;
  };

  const processedContent = dataPost?.content
    ? addClassToImages(dataPost.content)
    : "";

  useEffect(() => {
    if (dataPost) {
      document.title = `B-Info | ${dataPost.title}`;
    }
  }, [dataPost]);

  return (
    <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
      <div
        id="header-blogs"
        className="py-16 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-[#0076ff]/[0.1] dark:from-[#0076ff]/[0.22] to-[#0076ff]/[0.02]"
      >
        <div className="container-blogs mx-auto">
          <div className="text-center flex flex-col gap-4">
            <h1 className="m-0 dark:text-white text-black">
              {dataPost?.title}
            </h1>
            <div className="flex justify-center items-center gap-3">
              <div>
                <NavLink
                  to={`/cong-cu-dau-tu/kien-thuc-dau-tu?category=${dataPost?.category.name}`}
                  className="no-underline text-[#faad14] font-medium md:text-lg sm:text-base"
                >
                  {dataPost?.category.name}
                </NavLink>
              </div>
              <div className="text-[#bbb]">|</div>
              <div className="dark:text-gray-300 text-black font-medium md:text-lg sm:text-base">
                {dataPost?.created_at
                  ? moment(dataPost.created_at)
                      .locale("vi")
                      .format("dddd, DD/MM/YYYY")
                  : moment().format("dddd, DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="body-blogs"
        className="container-blogs mx-auto px-3 pt-5 text-justify"
      >
        <div className="text-lg pb-5 dark:text-gray-300 text-black">
          <strong>{dataPost?.description}</strong>
        </div>
        <div className="flex justify-center">
          <img
            src={`${resourceURL}${dataPost?.thumbnail}`}
            alt={`${dataPost?.title}-thumbnail`}
            className="my-1 block float-none align-top relative max-w-[65%]"
          ></img>
        </div>
        <div
          className="dark:text-gray-300 text-black"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        ></div>
      </div>
      <div id="footer-blogs">
        <hr className="h-px mt-7 border-0 bg-gray-600/50"></hr>
        <div>
          <div className="flex items-center justify-center gap-2 dark:text-gray-300 text-black">
            <h2 className="my-7">Bài viết liên quan</h2>
          </div>
          <div className="w-[65%] mx-auto grid grid-cols-9 gap-4">
            {relatedBlogs && relatedBlogs.length > 0 ? (
              <>
                {relatedBlogs.slice(0, visibleBlogsCount).map((item, index) => (
                  <motion.div
                    className="col-span-3 flex flex-col gap-4 px-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.01,
                      transition: { duration: 0.4 },
                    }}
                  >
                    <div className="h-[200px]">
                      <NavLink
                        to={`/cong-cu-dau-tu/kien-thuc-dau-tu/${formatTitle(item.title)}/${item.id}`}
                        className="no-underline text-[#0050AD] text-xs"
                      >
                        <motion.img
                          src={`${resourceURL}${item.thumbnail}`}
                          alt={item.title}
                          className="w-full h-full block float-none align-top relative rounded"
                          whileHover={{
                            scale: 1.04,
                            transition: { duration: 0.3 },
                          }}
                        ></motion.img>
                      </NavLink>
                    </div>
                    <div>
                      <div className="flex gap-[6px]">
                        {item.tags.map((tag, tagIndex) => (
                          <NavLink
                            to={`/cong-cu-dau-tu/kien-thuc-dau-tu?tags=${tag.name}`}
                            key={tagIndex}
                            className="no-underline text-[#faad14] text-[13px]"
                          >
                            <motion.div whileHover={{ scale: 1.1 }}>
                              #{tag.name}
                            </motion.div>
                          </NavLink>
                        ))}
                      </div>
                      <NavLink
                        to={`/cong-cu-dau-tu/kien-thuc-dau-tu/${formatTitle(item.title)}/${item.id}`}
                        className="no-underline text-[#0050AD] text-xs"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="text-lg font-medium text-[#2989f9] line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-gray-500 text-[15px] line-clamp-2">
                            {item.description}
                          </div>
                          <div className="text-gray-500 text-[13px] text-right">
                            {moment(item.created_at).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </motion.div>
                ))}

                {visibleBlogsCount < relatedBlogs.length && (
                  <div
                    className="col-span-full flex justify-center items-center py-2"
                    onClick={handleShowMore}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button
                      type="primary"
                      ghost
                      className="text-base font-medium h-[38px] rounded-3xl"
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mx-auto col-span-full p-3 text-lg dark:text-gray-300 text-black font-medium">
                Không có bài viết liên quan nào
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
