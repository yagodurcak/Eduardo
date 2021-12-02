import "./Table.css"

import React, {useState} from 'react'

const Table = props => {

    const initDataShow = props.limit && props.bodyInfo ? props.bodyInfo.slice(0, Number(props.limit)) : props.bodyInfo

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = 1

    let range = []

    if (props.limit !== undefined) {
        let page = Math.floor(props.bodyInfo.length / Number(props.limit))
        pages = props.bodyInfo.length % Number(props.limit) === 0 ? page : page + 1
        range = [...Array(pages).keys()]
    }

    const [currPage, setCurrPage] = useState(0)

    const selectPage = page => {
        const start = Number(props.limit) * page
        const end = start + Number(props.limit)

        setDataShow(props.bodyInfo.slice(start, end))

        setCurrPage(page)
    }
    return (
        <div >
            <table className="tabla">
                {
                    props.headerTitle ? (
                        <thead >
                            <tr>
                                {
                                    props.headerTitle.map((item, index) => (
                                        <th key={index} className="Thead">
                                            {item}
                                        </th>
                                    ))
                                }
                            </tr>

                        </thead>
                    ) : null}
                {
                    props.bodyInfo ? (
                        <tbody>
                            {
                                props.bodyInfo.map((item, index) => (
                                    <tr key={index} className="Tbody">
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.total_orders}</td>
                                        <td>{item.total_spend}</td>
                                        <td>{item.location}</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    ) : null
                }

            </table>
            {
                pages > 1 ? (
                    <div className="table__pagination">
                        {
                            range.map((item, index) => (
                                <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
