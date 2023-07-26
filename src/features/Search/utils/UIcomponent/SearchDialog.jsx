import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { handleDebounceSearch } from '../../thunk';
import { NavLink } from 'react-router-dom';
import { ImSearch } from "react-icons/im";
import CloseIcon from '@mui/icons-material/Close';
const resourceURL = process.env.REACT_APP_RESOURCE_URL

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
export default function SearchDialog() {
    const dispatch = useDispatch()
    const { searchResult } = useSelector(state => state.search)
    const [dataSearch, setDataSearch] = useState()
    const [isTyping, setIsTyping] = useState('Typing stopped');
    const [val, setVal] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (debouncedValue === '') {
            setDataSearch([]);
            return
        }
        dispatch(handleDebounceSearch(debouncedValue))
    }, [debouncedValue])
    useEffect(() => {
        if (searchResult?.length > 0) {
            setDataSearch(searchResult)
        }
    }, [searchResult])

    // debounce
    const [, cancel] = useDebounce(
        () => {
            setIsTyping('Typing stopped');
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
    };

    return (
        <div>
            <ImSearch onClick={handleClickOpen} className='cursor-pointer dark:text-white text-black text-[19px] ml-0.5 hover:dark:text-blue-400 hover:text-blue-400 transition-all duration-200' />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className='flex justify-around items-center bg-slate-500' >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm…"
                            value={val}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={({ currentTarget }) => {
                                setIsTyping('Waiting for typing to stop...');
                                setVal(currentTarget.value);
                            }}
                        />
                    </Search>
                    <CloseIcon onClick={handleClose} className='cursor-pointer' />
                </div>
                <div className='container mx-auto xl:w-full lg:w-[90%] md:w-[90%]'>
                    <h4 className='px-4 py-3 text-lg border-solid border-[#f44336] border-b-2 border-t-0 border-x-0'>Mã chứng khoán {dataSearch?.length > 0 ? (
                        <span className='text-[#e70a0a] text-base'>({dataSearch?.length.toLocaleString('en-US', { maximumFractionDigits: 2 })})</span>
                    ) : (
                        <span className='text-[#e70a0a] text-base'>(-)</span>
                    )}
                    </h4>
                    {dataSearch?.map((item, index) => {
                        return (
                            <div key={index}>
                                <NavLink to={`/co-phieu/${item.code}`}
                                    className='flex no-underline p-3 border-solid border-[#d7d7d7] border-b-[1px] border-t-0 border-x-0 hover:bg-[#ffdead]'>
                                    <div>
                                        <img className='object-contain w-[85px] h-[58px]' src={`${resourceURL}${item.image}`} onError={event => {
                                            event.target.src = `${resourceURL}/resources/stock/logo_default.jpeg`
                                            event.onerror = null
                                        }} alt="companyImg" />
                                    </div>
                                    <div className='flex flex-col justify-center pl-2'>
                                        <div>
                                            <span className='font-semibold'>{item.code}</span>: {item.company_name}
                                        </div>
                                        <div className='mt-1.5'>
                                            {item.short_name ? (item.short_name) : (item.code)} | {item.floor}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </Dialog>
        </div>
    );
}