import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import moment from "moment";
import { Component } from 'react'

export class Grafica extends React.Component {
    constructor(props) {
        super(props)

    }
    
    render() {
        let e = this.props.history;
        console.log("e", e);
        let data = [];
        this.props.history.forEach(item => {
            if(item.response){

                data.push({
                    time: moment.unix(item.time).format('LLL'),
                    response: item.response[ Object.keys(item.response)[0] ],
                });
            }
        });

        return (
            <div>
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="response" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
                </LineChart>
            </div>
        )
    }
}

export default Grafica

