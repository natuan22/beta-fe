import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCateInvestKnowledge } from "../thunk";
import LinkGroup from "../components/InvestKnowledge/partials/LinkGroup";
import { apiUrl } from "../../../services/config";

const InvestKnowledge = () => {
  const dispatch = useDispatch();
  const { dataCateInvestKnowledge } = useSelector((state) => state.investTool);

  useEffect(() => {
    dispatch(fetchDataCateInvestKnowledge());
  }, [dispatch]);

  return (
    // <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
    //   <div className="grid grid-cols-12 gap-4">
    //     <div className="col-span-3 px-5">
    //       <div className="shadow-md dark:shadow-gray-100/10 shadow-[#0e1015]/10 rounded-md p-4">
    //         <ul>
    //           {Array.isArray(dataCateInvestKnowledge) &&
    //             dataCateInvestKnowledge.map((item, index) => (
    //               <LinkGroup key={index} activecondition={index === 0}>
    //                 {(handleClick, open) => (
    //                   <>
    //                     <a
    //                       href="#0"
    //                       className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 hover:text-gray-900 dark:hover:text-white no-underline`}
    //                       onClick={(e) => {
    //                         e.preventDefault();
    //                         handleClick();
    //                       }}
    //                     >
    //                       <div className="flex items-center justify-between">
    //                         <div className="flex items-center">
    //                           <span className="font-medium lg:opacity-0 2xl:opacity-100 duration-200">
    //                             {item.name}
    //                           </span>
    //                         </div>
    //                         {/* Icon */}
    //                         {Array.isArray(item.children) && (
    //                           <div className="flex shrink-0 ml-2">
    //                             <svg
    //                               className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
    //                               viewBox="0 0 12 12"
    //                             >
    //                               <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
    //                             </svg>
    //                           </div>
    //                         )}
    //                       </div>
    //                     </a>
    //                     {open && Array.isArray(item.children) && (
    //                       <ul className="pl-2">
    //                         {item.children.map((child, childIndex) => (
    //                           <li key={childIndex} className="px-2 pt-3 pb-2 last:pb-0 text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer list-none">
    //                             {child.name}
    //                           </li>
    //                         ))}
    //                       </ul>
    //                     )}
    //                   </>
    //                 )}
    //               </LinkGroup>
    //             ))}
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="col-span-9 px-5"></div>
    //   </div>
    // </div>
    <div>
      <div className="h-auto pt-5 pb-2 flex justify-center ">
        <div className="flex md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center">
          <div className="px-2 relative">
            <a
              href="https://zalo.me/1623670409453822014"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]"
                src={`${apiUrl}/resources/images/banner1.png`}
                alt="zalo-banner"
              />
            </a>
          </div>
          <div className="px-2 relative">
            <a
              href="https://t.me/betaEmarketbot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]"
                src={`${apiUrl}/resources/images/banner2.png`}
                alt="tele-banner"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestKnowledge;
