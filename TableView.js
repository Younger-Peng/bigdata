import React from 'react';
import _ from 'lodash';


class TableView1 extends React.Component {
    constructor(props) {
        super(props)
        var {sortKey, sortDir} = this.props;
        this.state = {
            sortKey,
            sortDir
        }
    }

    handleSort(key, ifSort) {
        if(!ifSort) return
        var {sortDir, sortKey} = this.state;
        if(sortKey === key) {
            if(sortDir === 'asc') {
                sortDir = 'desc'
            } else {
                sortDir = 'asc'
            }
        } else {
            sortDir = 'desc'
        }
        this.setState({
            sortKey: key,
            sortDir
        })
    }

    handleDownload() {
        var {tableHeader, tableBody} = this.props;
        var headerIds = _.map(tableHeader[0], 'id');
        var headerStr = _.chain(tableHeader[0]).map(item => item.name).join('\t').value()
        var bodyStr = _.chain(tableBody).map(rowObj => {
            return _.chain(headerIds).map(id => {
                var value = rowObj[id]
                if((typeof value) === 'object' ) {
                    return value.props.children
                }
                return value
            }).join('\t')
        }).join('\r\n').value()
        var dataStr = headerStr + '\r\n' + bodyStr;
        download(dataStr)
    }

    render() {
        var {tableHeader, tableBody, hover, ignore} = this.props;
        var {sortKey, sortDir} = this.state;
        var headerIds = _.map(tableHeader[0], 'id');
        var headerNames = _.map(tableHeader[0], 'name');
        var [first, ...rest] = tableBody;
        if(ignore) {
            rest = _.orderBy(rest, [sortKey], [sortDir])
            tableBody = [first, ...rest]
        } else {
            tableBody = _.orderBy(tableBody,[sortKey], [sortDir])
        }
        return (
            <div style={{overflow: 'auto', position: 'relative'}}>
                <div>
                    <button onClick={this.handleDownload.bind(this)}>下载表格</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            {_.map(tableHeader[0], (headerObj, index) => {
                                var {id, name, ifSort} = headerObj;
                                return <th style={Object.assign({position: 'relative'}, ifSort ? {cursor: 'pointer'} : {})} key={`${name}${index}`} onClick={this.handleSort.bind(this, id, ifSort)}>
                                    {name}
                                    {
                                        ifSort ? (
                                            <span>
                                                <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, top: 2, color: '#ccc'}, id === sortKey && sortDir === 'asc' ? {color: 'black'} : {}, id === sortKey && sortDir !== 'asc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                                <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, bottom: 2, transform: 'rotate(180deg)', color: '#ccc'}, id === sortKey && sortDir === 'desc' ? {color: 'black'} : {}, id === sortKey && sortDir !== 'desc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                            </span>
                                        ) : ''
                                    }
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(tableBody, (bodyRow, rowIndex) => {
                                return (
                                    <tr key={`row${rowIndex}`} className={hover ? 'table_body' : ''}>
                                        {_.map(headerIds, (id, colIndex) => {
                                            var value = bodyRow[id], currentStyle = {}
                                            var {dataFormats, needCompare} = tableHeader[0][colIndex]
                                            if(dataFormats) {
                                                value = dataFormats(value)
                                            }
                                            if(needCompare) {
                                                if(bodyRow[id] < tableBody[0][id]) {
                                                    currentStyle = {color: 'red'}
                                                }
                                            }
                                            return <td key={`${rowIndex}${colIndex}`} style={currentStyle}> {value} </td>
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableView1

function download(dataStr) {
    var blob = new Blob([dataStr], {type: 'application/vnd.ms-excel'})
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob)
    a.download = '彭扬的下载.xls'
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}






























// class TableView extends React.Component {
//     constructor(props) {
//         super(props)
//         var {sortKey, sortDir} = this.props;
//         this.state = {
//             sortKey, sortDir
//         }
//     }
//
//     componentWillReceiveProps(nextProps) {
//         var {sortKey, sortDir} = nextProps;
//         this.setState({
//             sortKey, sortDir
//         })
//     }
//
//     render() {
//
//         //ignore表示排序时忽略的row，一直置顶，一般是第一行
//         var {tableHeader, tableBody, ignore, hover} = this.props;
//         if(ignore) {
//             var [total, ...rest] = tableBody
//             rest = rest.sort((a, b) => a[1] - b[1])
//             tableBody = [total, ...rest]
//         } else {
//             tableBody = tableBody.sort((a, b) => a[1] - b[1])
//         }
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         {_.map(tableHeader, (item, index) => {
//                             return <th key={`${item}${index}`}>{item}</th>
//                         })}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         _.map(tableBody, (bodyRow, index) => {
//                             return (
//                                 <tr key={`rowBody${index}`} className={hover ? 'table_body': ''}>
//                                     {_.map(bodyRow, (item, index) => <td key={`${item}${index}`}>{item}</td>)}
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <td colSpan="3">footer</td>
//                     </tr>
//                 </tfoot>
//             </table>
//         )
//     }
// }
