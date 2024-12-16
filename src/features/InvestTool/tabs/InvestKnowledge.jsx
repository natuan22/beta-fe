import { Button } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formatTitle } from "../../../helper/formatTitle";
import { resourceURL } from "../../../services/config";
import LinkGroup from "../components/InvestKnowledge/partials/LinkGroup";
import { fetchDataCateInvestKnowledge, fetchDataListPosts } from "../thunk";

const InvestKnowledge = () => {
  const dispatch = useDispatch();
  const { dataCateInvestKnowledge, dataListPosts } = useSelector((state) => state.investTool);
  const [activeId, setActiveId] = useState("all");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleActivate = (id) => {
    setActiveId(id);
    localStorage.setItem("activeTabBlogs", id);
  };

  useEffect(() => {
    dispatch(fetchDataCateInvestKnowledge());
    dispatch(fetchDataListPosts());
  }, [dispatch]);

  useEffect(() => {
    document.title = `B-Info | Kiến thức đầu tư`;
  }, []);

  const [visibleBlogsCount, setVisibleBlogsCount] = useState(10);

  const handleShowMore = () => {
    setVisibleBlogsCount((prevCount) => prevCount + 10);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size > 0) {
      if (searchParams.get("tags")) {
        dispatch(fetchDataListPosts("all", searchParams.get("tags")));
      } else {
        const cate = searchParams.get("category");

        // Hàm đệ quy để tìm kiếm trong cả danh sách và children
        const findCategoryId = (categories, name) => {
          for (const category of categories) {
            if (category.name === name) {
              setActiveId(category.id);
              return category.id; // Trả về ID nếu tìm thấy
            }
            if (category.children) {
              const childId = findCategoryId(category.children, name);
              if (childId) {
                setActiveId(category.id); // Nếu tìm thấy trong children, setActiveId thằng cha
                return childId;
              } // Trả về ID nếu tìm thấy trong children
            }
          }
          return null; // Không tìm thấy
        };

        const categoryId = findCategoryId(dataCateInvestKnowledge, cate);
        if (categoryId) {
          dispatch(fetchDataListPosts(categoryId));
        }
      }
    }
  }, [dispatch, searchParams, dataCateInvestKnowledge]);

  return (
    <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2 pb-1">
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="xl:col-span-3 lg:col-span-4 px-5">
          <div className="shadow-lg dark:shadow-gray-100/10 shadow-[#0e1015]/10 rounded-md p-5">
            <ul>
              <LinkGroup
                key="all"
                activecondition={activeId === "all"}
                index="all"
                onActivate={handleActivate}
              >
                {(handleClick) => (
                  <div
                    className={`cursor-pointer block ${activeId === "all" ? "text-[#faad14]" : "text-gray-800 dark:text-gray-100"} truncate transition duration-75 no-underline`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick();
                      dispatch(fetchDataListPosts());
                      navigate("/cong-cu-dau-tu/kien-thuc-dau-tu");
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium duration-200">
                          Tất cả bài viết
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </LinkGroup>

              {Array.isArray(dataCateInvestKnowledge) &&
                dataCateInvestKnowledge.map((item, index) => (
                  <LinkGroup
                    key={item.id}
                    activecondition={activeId === item.id}
                    index={item.id}
                    onActivate={handleActivate}
                  >
                    {(handleClick, open) => (
                      <>
                        <div
                          className={`cursor-pointer block truncate transition duration-75 no-underline`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick();

                            const ids = [
                              item.id,
                              ...item.children.map((childItem) => childItem.id),
                            ].join(",");
                            dispatch(fetchDataListPosts(ids));
                            navigate("/cong-cu-dau-tu/kien-thuc-dau-tu");
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium duration-200">
                                {item.name}
                              </span>
                            </div>
                            {Array.isArray(item.children) &&
                              item.children.length > 0 && (
                                <div className="flex shrink-0 ml-2">
                                  <svg
                                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                                    viewBox="0 0 12 12"
                                  >
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                </div>
                              )}
                          </div>
                        </div>
                        {open && Array.isArray(item.children) && (
                          <ul className="pl-2">
                            {item.children.map((child, childIndex) => (
                              <li
                                key={childIndex}
                                className={`px-2 pt-3 pb-2 last:pb-0 text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer list-none`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  dispatch(fetchDataListPosts(child.id));
                                  navigate("/cong-cu-dau-tu/kien-thuc-dau-tu");
                                }}
                              >
                                {child.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </LinkGroup>
                ))}
            </ul>
          </div>
        </div>
        <div className="xl:col-span-9 lg:col-span-8 px-5 py-4 min-h-[900px] rounded-md">
          <div className="text-2xl font-semibold p-[5px] text-[#faad14] border-solid border-[#25558d] border-b-[1px] border-t-0 border-x-0 mb-2">
            {activeId === "all" &&
              `Tất cả bài viết ${searchParams.get("tags") ? `(${searchParams.get("tags")})` : ""}`}
            {activeId !== "all" &&
              dataCateInvestKnowledge.find((item) => item.id === activeId)
                ?.name}
          </div>

          <div className="flex flex-col gap-2 mx-3">
            {Array.isArray(dataListPosts) ? (
              <>
                {dataListPosts
                  .slice(0, visibleBlogsCount)
                  .map((item, index) => (
                    <div>
                      <NavLink
                        to={`${formatTitle(item.title)}/${item.id}`}
                        key={index}
                        className="no-underline flex flex-col p-3 hover:bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-[#0076ff]/[0.14] dark:from-[#0076ff]/[0.26] to-[#0076ff]/[0.06] rounded-lg"
                      >
                        <div className="flex sm:flex-row xs:flex-col xxs:flex-col gap-3">
                          <div className="md:w-[75%] sm:w-[60%] flex flex-col gap-3">
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

                          <div className="card-img md:w-[25%] sm:w-[40%]">
                            <div className="flex sm:justify-end xs:justify-center xxs:justify-center h-[130px]">
                              <img
                                src={`${resourceURL}${item.thumbnail}`}
                                alt={item.title}
                                className="max-w-[100%] block float-none align-top relative h-full rounded"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                      <div className="border-solid border-b-[1px] border-x-0 border-t-0 border-gray-600/50 mt-2"></div>
                    </div>
                  ))}

                {visibleBlogsCount < dataListPosts.length && (
                  <div
                    className="flex justify-center items-center py-2"
                    onClick={handleShowMore}
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
              <div className="text-xl font-medium text-gray-800 dark:text-gray-100 text-center my-10">
                Không có bài viết nào ở chủ đề này
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestKnowledge;
