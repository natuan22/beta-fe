import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { handleDebounceSearch } from "../../thunk";
import { NavLink } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import imgDefault from "../image/default-image.jpg";
const resourceURL = process.env.REACT_APP_RESOURCE_URL;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      "&:focus": {
        width: "55ch",
      },
    },
  },
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
}));
export default function SearchDialog() {
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.search);
  const [dataSearch, setDataSearch] = useState();
  const [dataSearchLength, setDataSearchLength] = useState();
  const [val, setVal] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [open, setOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(10);
  useEffect(() => {
    if (debouncedValue === "") {
      setDataSearch([]);
      setDataSearchLength([]);
      setDisplayLimit(10);
      return;
    }
    dispatch(handleDebounceSearch(debouncedValue));
  }, [dispatch, debouncedValue]);
  useEffect(() => {
    if (searchResult) {
      setDataSearchLength(searchResult);
      setDataSearch(
        Array.isArray(searchResult) && searchResult?.slice(0, displayLimit)
      );
    }
  }, [searchResult, displayLimit]);
  // debounce
  const [, cancel] = useDebounce(
    () => {
      // console.log("do sth")
      setDebouncedValue(val);
    },
    500,
    [val]
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDataSearch([]);
    setDataSearchLength([]);
    setDisplayLimit(10);
    setVal("");
  };
  const handleLoadMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 10); // Tăng số lượng mục đang hiển thị lên 10
  };
  const countMatchedCharacters = (keyword, code) => {
    const keywordLower = keyword.toLowerCase();
    const codeLower = code.toLowerCase();

    let count = 0;
    for (let i = 0; i < keywordLower.length; i++) {
      if (codeLower.includes(keywordLower[i])) {
        count++;
      }
    }
    return count;
  };
  const sortedData =
    Array.isArray(dataSearchLength) &&
    [...dataSearchLength]
      .map((item) => ({
        ...item,
        matchedCount: countMatchedCharacters(debouncedValue, item.code),
      }))
      .sort((a, b) => b.matchedCount - a.matchedCount);
  return (
    <div>
      <ImSearch
        onClick={handleClickOpen}
        className="cursor-pointer dark:text-white text-black text-[19px] ml-0.5 hover:dark:text-blue-400 hover:text-blue-400 transition-all duration-200"
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="flex justify-around items-center bg-slate-500 p-5">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm …"
              autoFocus={true}
              value={val}
              inputProps={{ "aria-label": "search" }}
              onChange={({ currentTarget }) => {
                setVal(currentTarget.value);
              }}
            />
          </Search>
          <CloseIcon onClick={handleClose} className="cursor-pointer" />
        </div>
        <div className="container mx-auto xl:w-full lg:w-[90%] md:w-[90%]">
          <h4 className="px-4 py-3 text-lg border-solid border-[#f44336] border-b-2 border-t-0 border-x-0">
            Mã chứng khoán{" "}
            {dataSearchLength?.length > 0 ? (
              <span className="text-[#e70a0a] text-base">
                (
                {dataSearchLength?.length.toLocaleString("vi-VN", {
                  maximumFractionDigits: 2,
                })}
                )
              </span>
            ) : (
              <span className="text-[#e70a0a] text-base">(-)</span>
            )}
          </h4>
          {Array.isArray(sortedData) &&
            sortedData
              .slice(0, displayLimit)
              .map((item, index) => {
                const matchedCount = countMatchedCharacters(
                  debouncedValue,
                  item.code
                );
                return { ...item, matchedCount }; // Thêm thuộc tính matchedCount vào mỗi item
              })
              .sort((a, b) => b.matchedCount - a.matchedCount) // Sắp xếp các item theo số lượng ký tự trùng khớp giảm dần
              .map((item, index) => {
                const characters = item.code.split(""); // Khai báo biến "characters" tại đây
                return (
                  <div key={index}>
                    <NavLink
                      onClick={handleClose}
                      to={`/co-phieu/${item.code}-${item.type}`}
                      className="flex no-underline p-3 border-solid border-[#d7d7d7] border-b-[1px] border-t-0 border-x-0 hover:bg-[#ffdead] transition-all duration-300"
                    >
                      <div>
                        <img
                          className="object-contain w-[85px] h-[58px]"
                          src={`${resourceURL}${item.image}`}
                          onError={(event) => {
                            event.target.src = imgDefault;
                            event.onerror = null;
                          }}
                          alt="companyImg"
                        />
                      </div>
                      <div className="flex flex-col justify-center pl-2">
                        <div>
                          <span className="font-semibold">
                            {characters.map((character, charIndex) => {
                              // Kiểm tra xem ký tự có trùng khớp với bất kỳ ký tự nào trong debouncedValue không
                              const isHighlighted = debouncedValue
                                .split("")
                                .some(
                                  (debouncedChar) =>
                                    debouncedChar.toLowerCase() ===
                                    character.toLowerCase()
                                );
                              return (
                                <span
                                  key={charIndex}
                                  style={{
                                    color: isHighlighted ? "red" : "",
                                    fontWeight: isHighlighted ? "bold" : "",
                                  }}
                                >
                                  {character}
                                </span>
                              );
                            })}
                          </span>
                          : {item.company_name}
                        </div>
                        <div className="mt-1.5">
                          {item.short_name ? item.short_name : item.code} |{" "}
                          {item.floor}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
        </div>
        <div className="grid place-items-center p-2">
          {dataSearchLength?.length > 10 ? (
            <Button variant="outlined" onClick={handleLoadMore}>
              Xem thêm <MoreHorizIcon />
            </Button>
          ) : (
            <></>
          )}
        </div>
      </Dialog>
    </div>
  );
}
