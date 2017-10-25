import React from 'react';
import _ from 'lodash';

function getDownloadHeader(headerData) {
    var data = []
    function insertData(originalData, level) {
        _.each(originalData, (item, index) => {
            var templevel = level ? level : 0;
            data[templevel] = data[templevel] ? data[templevel] : []
            data[templevel].push(item.name)
            if(item.colSpan) {
                for(let i=0; i<item.colSpan-1; i++) {
                    data[templevel].push(' ')
                }
            }
            if(item.rowSpan) {
                for(let i=0; i<item.rowSpan-1; i++) {
                    if(data[templevel+i+1]) {
                        data[templevel+i+1].push(' ')
                    } else {
                        data[templevel+i+1] = [' ']
                    }
                }
            }
            if(item.children) {
                templevel++
                insertData(item.children, templevel)
            }
        })
    }
    insertData(headerData)
    return _.chain(data).map(row => row.join('\t')).join('\r\n').value()
}

function getData(row, accessor) {
    if( (typeof row[accessor]) === 'object' ) {
        return _getData(row[accessor])
    } else if(row[accessor] === '_IGNORE_ME_') {
        return ' '
    } else {
        return row[accessor]
    }

    function _getData(react_ele) {
        if( (typeof react_ele) === 'object' ) {
            return _getData(react_ele['props']['children'])
        } else {
            return react_ele
        }
    }
}

function getDownloadBody(accessorArr, bodyData) {
    var accessors = _.map(accessorArr, 'accessor')
    return _.chain(bodyData).map(row => {
        return _.chain(accessors).map(accessor => getData(row, accessor)).join('\t').value()
    }).join('\r\n').value()
}

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

function percentFormatter(data) {
    return data + '%'
}

var TableHeader = [
    {
        name: '序号',
        freeze: true,
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
        accessor: 'ref_count',
        ifSort: true
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
                    {name: '人数', accessor: 'count', ifSort: true},
                    {name: '占比', accessor: 'rate', ifSort: true, dataFormats: percentFormatter},
                    {name: '累计人数', accessor: 'sum_count', ifSort: true, dataFormats: styleFormatter},
                    {name: '累计占比', accessor: 'sum_rate', ifSort: true, dataFormats: percentFormatter}
                ]}
            ]}
        ]
    }
]

var TableBodys = [
    {
        show: false,
        class: '1',
        ref_count: 100,
        count: 100,
        rate: 10,
        sum_count: 100,
        sum_rate: 10
    },
    {
        class: '2',
        ref_count: 110,
        count: 110,
        rate: 20,
        sum_count: 120,
        sum_rate: 20
    },
    {
        class: '3',
        ref_count: 200,
        count: 200,
        rate: 20,
        sum_count: 200,
        sum_rate: 30
    },
    {
        class: '4',
        ref_count: 400,
        count: 500,
        rate: 40,
        sum_count: 400,
        sum_rate: 60
    },
    {
        class: '5',
        ref_count: 700,
        count: 700,
        rate: 50,
        sum_count: 600,
        sum_rate: 90
    }
]

// var TableHeader = [
//     {name: '题型', accessor: 'question_type', freeze: true},
//     {name: '难度', accessor: 'difficulty', freeze: true},
//     {name: '0-0.2', accessor: 'segment0'},
//     {name: '分数', accessor: 'mark'}
// ];
//
// var TableBodys = [
//     {question_type: '客观题', question_type_rowSpan: 2, difficulty: '题号', mark: 100},
//     {question_type: '_IGNORE_ME_', difficulty: '分数', mark: 5},
//     {question_type: '主观题', question_type_rowSpan: 2, difficulty: '题号', segment0: '一.6, 二.21.1', mark: 23},
//     {question_type: '_IGNORE_ME_', difficulty: '分数', segment0: 6, mark: 34},
//     {question_type: '分数', question_type_colSpan: 2, difficulty: '_IGNORE_ME_', segment0: 6, mark: 13}
// ]

const TableHead = ({tableHeader, sortKey, sortDir, handleSort}) => {
    return (
        <thead>
            {
                _.map(tableHeader, (headerRow, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {
                                _.map(headerRow, (item, colIndex) => {
                                    var {colSpan, rowSpan, ifSort, accessor} = item;
                                    return (
                                        <th key={colIndex} colSpan={colSpan ? colSpan : 1} rowSpan={rowSpan ? rowSpan : 1} style={{position: 'relative'}} onClick={handleSort.bind(null, accessor, ifSort)}>
                                            {item.name}
                                            {
                                                ifSort ? (
                                                    <span>
                                                        <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, top: 2, color: '#ccc'}, accessor === sortKey && sortDir === 'asc' ? {color: 'black'} : {}, accessor === sortKey && sortDir !== 'asc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                                        <span style={Object.assign({display: 'inline-block', position: 'absolute', right: 2, bottom: 2, transform: 'rotate(180deg)', color: '#ccc'}, accessor === sortKey && sortDir === 'desc' ? {color: 'black'} : {}, accessor === sortKey && sortDir !== 'desc' ? {display: 'none'} : {})}><i className="icon iconfont icon-up"></i></span>
                                                    </span>
                                                ) : ''
                                            }
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </thead>
    )
}

const Tds = ({rowIndex, accessorArr, row, rowHead, handleCellClick}) => {
    var tds = []
    _.each(accessorArr, (accessorObj, columnIndex) => {
        var {accessor, dataFormats} = accessorObj;
        var value = row[accessor];
        if(value === '_IGNORE_ME_') return
        if(value === undefined || value === null) {
            value = '--'
        } else {
            if(dataFormats) {
                value = dataFormats(value)
            }
        }
        var rowSpan = row[`${accessor}_rowSpan`]
        var colSpan = row[`${accessor}_colSpan`]
        rowSpan = rowSpan > 1 ? rowSpan : 1;
        colSpan = colSpan > 1 ? colSpan : 1;
        tds.push( <td colSpan={colSpan} rowSpan={rowSpan} key={`columnIndex${columnIndex}`} onClick={handleCellClick.bind(null, rowIndex, columnIndex, row[rowHead], accessor)} >{value}</td> )
    })
    return tds
}

const TableBody = ({bodyData, accessorArr, sortKey, sortDir, stickyTotal, handleCellClick}) => {

    //过滤出可以展示的row
    bodyData = bodyData.filter(row => row.show !== false)
    var rowHead = accessorArr[0]['accessor']

    //如果第一行row的数据需要置顶的话
    if(stickyTotal) {
        var [total, ...rest] = bodyData
        rest = _.orderBy(rest, [sortKey], [sortDir])
        bodyData = [total, ...rest]
    } else {
        bodyData = _.orderBy(bodyData, [sortKey], [sortDir])
    }
    return (
        <tbody>
            {
                _.map(bodyData, (row, rowIndex) => {
                    return (
                        <tr key={`rowIndex${rowIndex}`}>
                            <Tds rowIndex={rowIndex} accessorArr={accessorArr} row={row} rowHead={rowHead} handleCellClick={handleCellClick}/>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

class TableView2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortKey: this.props.sortKey ? this.props.sortKey : '',
            sortDir: this.props.sortDir ? this.props.sortDir : ''
        }
    }

    handleSort(key, ifSort) {
        if(!ifSort) return
        this.props.handleSort(key)
    }

    handleCellClick(rowIndex, columnIndex, rowHead, columnHead) {
        console.log(`你点击了第${rowIndex}行`)
        console.log(`你点击了第${columnIndex}列`)
        console.log(`行首为${rowHead}`)
        console.log(`列首为${columnHead}`)
    }

    handleDownload() {
        var headerRows = this.headerData.length;
        var downloadHeader = getDownloadHeader(this.headerData)
        var downloadBody = getDownloadBody(this.accessorArr, this.bodyData)
        var dataStr = downloadHeader + '\r\n' + downloadBody;
        console.log(dataStr)
        download(dataStr)
    }

    componentWillReceiveProps(nextProps) {
        var {sortKey, sortDir} = nextProps;
        this.setState({
            sortKey,
            sortDir
        })
    }

    render() {
        var {headerData, bodyData, stickyTotal, showDownload} = this.props;
        this.headerData = headerData
        this.bodyData = bodyData
        var tableHeader = getHeaderContainer(headerData)
        var accessorArr = this.accessorArr = getAccessorArr(headerData)
        return (
            <div>
                {showDownload ? <button onClick={this.handleDownload.bind(this)}>下载表格</button> : ''}
                <table>
                    <TableHead tableHeader={tableHeader} sortKey={this.state.sortKey} sortDir={this.state.sortDir} handleSort={this.handleSort.bind(this)} />
                    <TableBody bodyData={bodyData} accessorArr={accessorArr} sortKey={this.state.sortKey} sortDir={this.state.sortDir} stickyTotal={stickyTotal} handleCellClick={this.handleCellClick.bind(this)}/>
                </table>
            </div>
        )
    }
}

class ModuleContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sortKey: this.props.sortKey ? this.props.sortKey : '',
            sortDir: this.props.sortDir ? this.props.sortDir : ''
        }
    }

    handleSort(key) {
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
        var downloadHeader = getDownloadHeader(this.headerData)
        var downloadBody = getDownloadBody(this.accessorArr, this.bodyData)
        var dataStr = downloadHeader + '\r\n' + downloadBody;
        download(dataStr)
    }

    render() {
        this.headerData = TableHeader;
        this.bodyData = TableBodys;
        var accessorArr = this.accessorArr = getAccessorArr(TableHeader)
        var FrozenTableHeader = TableHeader.filter(item => item.freeze)
        var normalTableHeader = TableHeader.filter(item => !item.freeze)
        var {sortKey, sortDir} = this.state;
        return (
            <div>
                <button onClick={this.handleDownload.bind(this)}>下载表格</button>
                <div style={{display: 'flex', width: 400}}>
                    <div style={{boxShadow: '3px 0 3px 0 #eee', position: 'relative', zIndex: 1}}>
                        <TableView2 headerData={FrozenTableHeader} bodyData={TableBodys} stickyTotal={true} sortKey={sortKey} sortDir={sortDir} showDownload={false} handleSort={this.handleSort.bind(this)}/>
                    </div>
                    <div style={{flex: 1, overflow: 'auto'}}>
                        <TableView2 headerData={normalTableHeader} bodyData={TableBodys} stickyTotal={true} sortKey={sortKey} sortDir={sortDir} showDownload={false} handleSort={this.handleSort.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModuleContainer

function getHeaderContainer(header) {
  var res = []
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
            item.accessor = _headerObj.accessor
        }
        if(_headerObj.ifSort) {
            item.ifSort = true
        }
        if(_headerObj.dataFormats) {
            item.dataFormats = _headerObj.dataFormats
        }
        res[level].push(item)
    })
    if(hasChildren) {
        level++
        _.each(header, headerObj => getHeader(headerObj.children, level))
    }
  }
  getHeader(header)
  return res
}

function getAccessorArr(header) {
    var accessorArr = []
    function getAccessor(header) {
        _.each(header, column => {
            if(column.accessor) {
                var temp = {accessor: column.accessor}
                if(column.dataFormats) {temp.dataFormats = column.dataFormats}
                accessorArr.push(temp)
            } else {
                getAccessor(column.children)
            }
        })
    }
    getAccessor(header)
    return accessorArr
}

function styleFormatter(data) {
    return <span style={{color: 'red'}}>{data}</span>
}
