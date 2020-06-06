import React, { Component } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

class Chart extends Component {

    render() {
        const charVal = this.props.getStateValue.chartData;
        return (
            <div className="lineChart">
                <ResponsiveContainer width='99%' aspect={3.0}>
                    <LineChart data={charVal}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ID" />
                        <YAxis dataKey="votes" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ID" stroke="orange" />
                        <Line type="monotone" dataKey="votes" stroke="blue" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Chart;