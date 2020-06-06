import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

class Chart extends Component {

    state = {
        lineChartData: [
            {
                "name": "Page A",
                "ID": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "ID": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "ID": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "ID": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "ID": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "ID": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "ID": 4300,
                "amt": 2100
            }
        ]
    }

    render() {
        return (
            <div className="lineChart">
                <LineChart width={900} height={250} data={this.state.lineChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ID" stroke="#8884d8" />
                </LineChart>
            </div>
        )
    }
}

export default Chart;