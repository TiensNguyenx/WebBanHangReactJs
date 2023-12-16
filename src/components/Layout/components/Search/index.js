
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdOutlineClear } from "react-icons/md";

import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../Popper';
import SearchResult from '../SearchResult';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from "~/hooks";
import { useState, useRef, useEffect } from "react";
const cx = classNames.bind(styles)
function Search() {
    const [serachResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const debounced = useDebounce(searchValue, 500)
    const [check, setCheck] = useState(false)
    const inputRef = useRef();
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus();
    }
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;

        }
        setLoading(true);
        fetch(`https://be-web-mn5x.onrender.com/api/product/search?searchName=${encodeURIComponent(debounced)}`)
            .then(res => res.json())
            .then(data => {
                setSearchResult(data.data)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }, [debounced])
    return (
        <div style={{ width: '100%' }}>
            <HeadlessTippy
                placement='bottom-start'
                interactive
                visible={showResult && serachResult.length > 0}

                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs} >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Kết quả tìm kiếm
                            </h4>
                            {serachResult.map((data, index) => {
                                return (
                                    <div onClick={() => setCheck(!check)} key={index}>
                                        <SearchResult key={data._id} data={data} />

                                    </div>
                                )
                            })}

                        </PopperWrapper>

                    </div>

                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={cx('search')} >
                    <input style={{ height: '100%' }}
                        ref={inputRef}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Nhập tên sản phẩm, mã sản phẩm, từ khóa cần tìm kiếm...'
                        spellCheck={false}
                        value={searchValue}
                        onFocus={() => setShowResult(true)}
                    >
                    </input>
                    {!!searchValue && !loading && <span className={cx('icon-clear')} onClick={handleClear}>
                        <MdOutlineClear style={{ fontSize: '2rem' }} />  </span>}
                    <span className={cx('icon-search')}>   <FaSearch /> </span>
                    {loading && <span className={cx('icon-loading')}> <AiOutlineLoading3Quarters style={{ fontSize: '2rem' }} /> </span>}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;