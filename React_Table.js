import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Table extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = []
        for(let i=0; i<100; i++) {
            var obj = {
                name: 'Tanner' + i,
                age: randomAge(),
                friend: {
                    name: 'Jason' + i,
                    age: randomAge()
                },
                rate: randomAge()
            }
            data.push(obj)
        }

        var rate0 = data[0]['rate'];

        const columns = [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Age',
            accessor: 'age',
            sortable: true,
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            id: 'friendName',
            Header: 'Friend Name',
            accessor: d => d.friend.name
        }, {
            Header: props => <span>Friend Age</span>,
            accessor: 'friend.age',
            sortable: true
        }, {
            Header: 'Rate',
            accessor: 'rate',
            sortable: true,
            Cell: props => <span className={props.value < rate0 ? 'red' : 'green'}>{props.value} %</span>
        }];

        return (
            <div style={{width: '600px', height: '400px'}}>
                <ReactTable data={data} columns={columns} loading={false}
                    showPaginationTop={true} showPaginationTop={false}
                    showPageSizeOptions={true} pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    defaultPageSize={10} minRows={5} showPageJump={false} collapseOnSortingChange={true}
                    collapseOnPageChange={true} collapseOnDataChange={true} sortable={false}
                />
            </div>
        )
    }
}

export default Table

function randomAge() {
    var age = Math.floor(Math.random() * 100)
    return age + 1
}
