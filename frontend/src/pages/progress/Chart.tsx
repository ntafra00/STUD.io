import React from "react"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const chartData = [
    {
        "name": "13.05.2022.",
        "mark": 4
      },
      {
        "name": "15.05.2022.",
        "mark": 5
      },
      {
        "name": "17.05.2022.",
        "mark": 1
      },
      {
        "name": "19.05.2022.",
        "mark": 2
      },
      {
        "name": "21.05.2022.",
        "mark": 1
      },
      {
        "name": "23.05.2022.",
        "mark": 4
      },
      {
        "name": "25.05.2022.",
        "mark": 3
      },
      {
        "name": "30.05.2022.",
        "mark": 2
      }
]

const Chart: React.FC = () => {
    return (
        <LineChart width={1500} height={500} data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" style={{margin: "20"}}/>
            <YAxis dataKey="mark" domain={[0,5]} ticks={[1,2,3,4,5]}/>
            <Tooltip />
            <Line type="monotone" dataKey="mark" stroke="#1769aa" />
        </LineChart>
    )
}

export default Chart;