import React, { useContext} from "react"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import { SolutionContext } from "../../context/contexts/solutionContext";
import MarkedSolution from "../../models/markedSolution";

interface IProps {
    chartData: MarkedSolution[];
}

const Chart: React.FC<IProps> = ({chartData}) => {

    const {state} = useContext(SolutionContext);
    const data = chartData.map((information) => {
      return {
        "name": information.expiration_date.split("T")[0],
        "mark": information.mark
      }
    })


    return (
      <LineChart width={1500} height={500} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{margin: "20"}}/>
            <YAxis dataKey="mark" domain={[0,5]} ticks={[1,2,3,4,5]}/>
            <Tooltip />
            <Line type="monotone" dataKey="mark" stroke="#1769aa" />
        </LineChart>
    )
}

export default Chart;