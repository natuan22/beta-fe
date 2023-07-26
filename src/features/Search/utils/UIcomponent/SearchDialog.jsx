import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDebounce } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { handleDebounceSearch } from '../../thunk';
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
    const [val, setVal] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [open, setOpen] = useState(false);
    const [displayLimit, setDisplayLimit] = useState(10)
    useEffect(() => {
        if (debouncedValue === '') {
            setDataSearch([]);
            setDisplayLimit(10)
            return
        }
        dispatch(handleDebounceSearch(debouncedValue))
    }, [debouncedValue, dispatch])
    useEffect(() => {
        if (searchResult?.length > 0) {
            setDataSearch(searchResult.slice(0, displayLimit))
        }
    }, [searchResult, dispatch, displayLimit])

    // debounce
    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(val);
        },
        500,
        [val]
    );
    const handleLoadMore = () => {
        setDisplayLimit(prevLimit => prevLimit + 10); // Tăng số lượng mục đang hiển thị lên 10
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <SearchIcon className='text-white' />
            </Button>
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

                                setVal(currentTarget.value);
                            }}
                        />
                    </Search>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                </div>
                <div>
                    {dataSearch?.map((item, index) => {
                        const characters = item.company_name.split('');
                        return (
                            <div key={index}>
                                <img width={125} height={80} src={`${resourceURL}${item.image}`} onError={event => {
                                    event.target.src = "https://default-image-link-goes-here"
                                    event.onerror = null
                                }} alt="companyImg" />
                                <div>
                                    <span>
                                        {characters.map((character, charIndex) => {
                                            // Kiểm tra xem ký tự trùng khớp với debounce value hay không
                                            const isHighlighted = character.toLowerCase() === debouncedValue.toLowerCase();

                                            return (
                                                <span key={charIndex} style={{ color: isHighlighted ? 'red' : 'black' }}>
                                                    {character}
                                                </span>
                                            );
                                        })}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {dataSearch?.length > 0 ? <Button variant="outlined" onClick={handleLoadMore}>
                        Xem thêm <MoreHorizIcon />
                    </Button> : <></>}
                </div>


            </Dialog>
        </div>
    );
}