/*
* @Author: liucong
* @Create By:   2017-10-13 09:41:26
*/
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./SuperTable.jsx";
import './master.css';
import './fonts/iconfont.css';

var TableHeader = [
    {
        name: '序号',
        freeze: 'left',
        children: [
            {
                name: '分数段比例',
                children: [
                    {
                        name: '起止分数',
                        children: [
                            {name: '班级', accessor: 'class', ifSort: true}
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: '参考人数',
        freeze: 'left',
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
    },
    {
        name: '2',
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
    },
    {
        name: '3',
        freeze: 'right',
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

var TableBody = [
    {

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

var TableHeader = [
    {name: '题型', accessor: 'question_type', freeze: 'left'},
    {name: '难度', accessor: 'difficulty', freeze: 'left'},
    {name: '0-0.2', accessor: 'segment0'},
    {name: '分数', accessor: 'mark'}
];

var TableBody = [
    {question_type: '客观题', question_type_rowSpan: 2, difficulty: '题号', mark: 100},
    {question_type: '_IGNORE_ME_', difficulty: '分数', mark: 5},
    {question_type: '主观题', question_type_rowSpan: 2, difficulty: '题号', segment0: '一.6, 二.21.1', mark: 23},
    {question_type: '_IGNORE_ME_', difficulty: '分数', segment0: 6, mark: 34},
    {question_type: '分数', question_type_colSpan: 2, difficulty: '_IGNORE_ME_', segment0: 6, mark: 13}
]

const rootEle = document.getElementById("root");
ReactDOM.render(<App TableHeader={TableHeader} TableBody={TableBody} stickyTotal={true} sortKey={''} sortDir={''} showDownload={true} />, rootEle);

if (module.hot) {
    // Capture hot update
    module.hot.accept("./App", () => {
        const NextApp = require("./App.js").default;
        ReactDOM.render(<NextApp />, rootEle);
    });
}

function percentFormatter(data) {
    return data + '%'
}

function styleFormatter(data) {
    return <span style={{color: 'red'}}>{data}</span>
}
