import React from 'react';
import _ from 'lodash';

// var TableHeader = [
//     {
//         name: '知识结构',
//         accessor: 'knowledge',
//         rowSpan: 2
//     },
//     {
//         name: '力学',
//         children: [
//             {name: '平均分', accessor: 'mechanics_mean'},
//             {name: '平均得分率', accessor: 'mechanics_meanrate'},
//             {name: '排名', accessor: 'mechanics_rank'}
//         ]
//     },
//     {
//         name: '实验',
//         children: [
//             {name: '平均分', accessor: 'test_mean'},
//             {name: '平均得分率', accessor: 'test_meanrate'},
//             {name: '排名', accessor: 'test_rank'}
//         ]
//     }
// ]

var TableHeader = [
    {
        name: '序号',
        children: [
            {
                name: '分数段比例',
                children: [
                    {
                        name: '起止分数',
                        children: [
                            {name: '班级', accessor: 'class'}
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: '参考人数',
        rowSpan: 4,
        accessor: 'ref_count'
    },
    {
        name: '1',
        colSpan: 4,
        children: [
            {name: '5%',
            colSpan: 4,
            children: [
                {name: '[8, 10]',
                colSpan: 4,
                children: [
                    {name: '人数', accessor: 'count'},
                    {name: '占比', accessor: 'rate'},
                    {name: '累计人数', accessor: 'sum_count'},
                    {name: '累计占比', accessor: 'sum_rate'}
                ]}
            ]}
        ]
    }
]
var TableBodys = [
    {
        showThisRow: false,
        class: '1',
        ref_count: 100,
        count: 100,
        rate: 10,
        sum_count: 100,
        sum_rate: 10
    },
    {
        showThisRow: false,
        class: '1',
        ref_count: 100,
        count: 100,
        rate: 10,
        sum_count: 100,
        sum_rate: 10
    },
    {
        showThisRow: false,
        class: '1',
        ref_count: 100,
        count: 100,
        rate: 10,
        sum_count: 100,
        sum_rate: 10
    },
    {
        showThisRow: false,
        class: '1',
        ref_count: 100,
        count: 100,
        rate: 10,
        sum_count: 100,
        sum_rate: 10
    }
]
function getAccessorArr(header) {
    var accessorArr = []
    function getAccessor(header) {
        _.each(header, column => {
            if(column.accessor) {
                accessorArr.push(column.accessor)
            } else {
                getAccessor(column.children)
            }
        })
    }
    getAccessor(header)
    return accessorArr
}

var Arr = getAccessorArr(TableHeader)
console.log(Arr)

function getHeaderContainer(header) {
  var res = [], accessorArr = [];
  function getHeader(header, level) {
    var hasChildren = false;
    level = level ? level : 0;
    res[level] = res[level] ? res[level] : []
    _.each(header, _headerObj => {
      var item = { name: _headerObj.name }
        if(_headerObj.children) {
            hasChildren = true;
            item.colSpan = _headerObj.colSpan || _headerObj.children.length;
        }
        if(_headerObj.rowSpan) {
          item.rowSpan = _headerObj.rowSpan
        }
        if(_headerObj.accessor) {
          accessorArr.push(_headerObj.accessor)
        }
        res[level].push(item)
    })
    if(hasChildren) {
        level++
        _.each(header, headerObj => getHeader(headerObj.children, level))
    }
  }
  getHeader(header)
  return {res, accessorArr}
}

const TableHead = ({tableHeader}) => {
    var {res, accessorArr} = getHeaderContainer(tableHeader)
    return (
        <thead>
            {
                _.map(res, (headerRow, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {
                                _.map(headerRow, (item, colIndex) => {
                                    var {colSpan, rowSpan} = item;
                                    return <th key={colIndex} colSpan={colSpan ? colSpan : 1} rowSpan={rowSpan ? rowSpan : 1}>{item.name}</th>
                                })
                            }
                        </tr>
                    )
                })
            }
        </thead>
    )
}

const TableBody = ({body}) => {
    var accessorArr = getAccessorArr(TableHeader)
    return (
        <tbody>
            {
                _.map(body, (row, rowIndex) => {
                    return (
                        <tr key={`rowIndex${rowIndex}`}>
                            {
                                _.map(accessorArr, (accessor, columnIndex) => {
                                    return <td key={`columnIndex${columnIndex}`}>{row[accessor]}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

class tableView2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table>
                <TableHead tableHeader={TableHeader} />
                <TableBody body={TableBodys}/>
            </table>
        )
    }
}


// class TableView1 extends React.Component {
//     constructor(props) {
//         super(props)
//         var {sortKey, sortDir} = this.props;
//         this.state = {
//             sortKey,
//             sortDir
//         }
//     }
//
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
//
//     handleDownload() {
//         var {tableHeader, tableBody} = this.props;
//         var headerIds = _.map(tableHeader[0], 'id');
//         var headerStr = _.chain(tableHeader[0]).map(item => item.name).join('\t').value()
//         var bodyStr = _.chain(tableBody).map(rowObj => {
//             return _.chain(headerIds).map(id => {
//                 var value = rowObj[id]
//                 if((typeof value) === 'object' ) {
//                     return value.props.children
//                 }
//                 return value
//             }).join('\t')
//         }).join('\r\n').value()
//         var dataStr = headerStr + '\r\n' + bodyStr;
//         download(dataStr)
//     }
//
//     render() {
//         var {tableHeader, tableBody, hover, ignore} = this.props;
//         var {sortKey, sortDir} = this.state;
//         var headerIds = _.map(tableHeader[0], 'id');
//         var headerNames = _.map(tableHeader[0], 'name');
//         var [first, ...rest] = tableBody;
//         if(ignore) {
//             rest = _.orderBy(rest, [sortKey], [sortDir])
//             tableBody = [first, ...rest]
//         } else {
//             tableBody = _.orderBy(tableBody,[sortKey], [sortDir])
//         }
//         return (
//             <div style={{overflow: 'auto', position: 'relative'}}>
//                 <div>
//                     <button onClick={this.handleDownload.bind(this)}>下载表格</button>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             {_.map(tableHeader[0], (headerObj, index) => {
//                                 var {id, name, ifSort} = headerObj;
//                                 return <th style={Object.assign({position: 'relative'}, ifSort ? {cursor: 'pointer'} : {})} key={`${name}${index}`} onClick={this.handleSort.bind(this, id, ifSort)}>
//                                     {name}
                                    // {
                                    //     ifSort ? (
                                    //         <span>
                                    //             <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, top: 2, color: '#ccc'}, id === sortKey && sortDir === 'asc' ? {color: 'black'} : {}, id === sortKey && sortDir !== 'asc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                    //             <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, bottom: 2, transform: 'rotate(180deg)', color: '#ccc'}, id === sortKey && sortDir === 'desc' ? {color: 'black'} : {}, id === sortKey && sortDir !== 'desc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                    //         </span>
                                    //     ) : ''
                                    // }
//                                 </th>
//                             })}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             _.map(tableBody, (bodyRow, rowIndex) => {
//                                 return (
//                                     <tr key={`row${rowIndex}`} className={hover ? 'table_body' : ''}>
//                                         {_.map(headerIds, (id, colIndex) => {
//                                             var value = bodyRow[id], currentStyle = {}
//                                             var {dataFormats, needCompare} = tableHeader[0][colIndex]
//                                             if(dataFormats) {
//                                                 value = dataFormats(value)
//                                             }
//                                             if(needCompare) {
//                                                 if(bodyRow[id] < tableBody[0][id]) {
//                                                     currentStyle = {color: 'red'}
//                                                 }
//                                             }
//                                             return <td key={`${rowIndex}${colIndex}`} style={currentStyle}> {value} </td>
//                                         })}
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

export default tableView2

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

var header = [
  {
    name: 'A',
    children: [
      {
        name: 'A-1',
        children: [
          {name: 'A-1-1'},
          {name: 'A-1-2'},
          {name: 'A-1-3'}
        ]
      },
      {
        name: 'A-2',
        children: [
          {name: 'A-2-1'},
          {name: 'A-2-2'},
          {name: 'A-2-3'}
        ]
      },
      {
        name: 'A-3',
        children: [
          {name: 'A-3-1'},
          {name: 'A-3-2'},
          {name: 'A-3-3'}
        ]
      }
    ]
  },
  {
    name: 'B',
    children: [
      {
        name: 'B-1',
        children: [
          {name: 'B-1-1'},
          {name: 'B-1-2'},
          {name: 'B-1-3'}
        ]
      },
      {
        name: 'B-2',
        children: [
          {name: 'B-2-1'},
          {name: 'B-2-2'},
          {name: 'B-2-3'}
        ]
      },
      {
        name: 'B-3',
        children: [
          {name: 'B-3-1'},
          {name: 'B-3-2'},
          {name: 'B-3-3'}
        ]
      }
    ]
  },
  {
    name: 'C',
    children: [
      {
        name: 'C-1',
        children: [
          {name: 'C-1-1'},
          {name: 'C-1-2'},
          {name: 'C-1-3'}
        ]
      },
      {
        name: 'C-2',
        children: [
          {name: 'C-2-1'},
          {name: 'C-2-2'},
          {name: 'C-2-3'}
        ]
      },
      {
        name: 'C-3',
        children: [
          {name: 'C-3-1'},
          {name: 'C-3-2'},
          {name: 'C-3-3'}
        ]
      }
    ]
  }
];

function headerArr(header, res, index) {
    res = res ? res : [];
    var hasChildren = false;
    var index = index ? index : 0;
    var temp = res[index] = [];

    _.each(header, (headerObj, index) => {
        if(headerObj.children) {
            hasChildren = true
        }
        temp.push(headerObj.name)
    })
    res[index].concat(temp)
    if(hasChildren) {
        index++
        return _.map(header, headerObj => headerArr(headerObj, res, index))
    }
    return res
}


function getHeader(header, level) {
    var hasChildren = false;
    level = level ? level : 0;
    res[level] = []
    _.each(header, _headerObj => {
        if(_headerObj.children) {
            hasChildren = true;
        }
        res[level].push(_headerObj.name)
    })
    if(hasChildren) {
        level++
        _.each(header, headerObj => getHeader(headerObj, level))
    }
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
