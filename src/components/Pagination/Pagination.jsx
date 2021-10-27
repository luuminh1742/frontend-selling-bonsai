import React from 'react'
import {AiOutlineLeft,AiOutlineLine,AiOutlineRight} from 'react-icons/ai'



function Pagination({ totalPage, currentPage, handlePageChange }) {




    return (
        <div className='d-flex'>
            <span
                style={{ ...text }}
            >
                Page: {currentPage}/{totalPage}
            </span>

            <div>

                {
                    currentPage === 1 ?
                        <button
                            style={{ ...styleBtn }}
                            title='next'
                        ><AiOutlineLine/></button>
                        :
                        <button
                            style={{ ...styleBtn }}
                            onClick={() => handlePageChange(currentPage--)}
                            title='prev'
                        ><AiOutlineLeft/></button>

                }

                {
                    currentPage === totalPage ?
                        <button
                            style={{ ...styleBtn }}
                            title='next'
                        ><AiOutlineLine/></button>
                        :
                        <button
                            style={{ ...styleBtn }}
                            onClick={() => handlePageChange(currentPage++)}
                            title='next'
                        ><AiOutlineRight/></button>

                }
            </div>
        </div>
    )
}

const text = {
    fontSize: 20
}

const styleBtn = {
    width: 35,
    height: 35,
    border: 'none',
    margin: '0 8px',
    borderRadius: 50
}

export default Pagination
