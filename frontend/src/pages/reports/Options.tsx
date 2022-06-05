import React, { useContext } from "react"
import Select from 'react-select'
import { ReportsContext } from "../../context/contexts/reportContext"

const Options: React.FC = () => {

    const {state, actions} = useContext(ReportsContext)
    const selectOptions = state.tasks.map((task) => {
        return {
            value: task.id,
            label: task.name
        }
    })

    const handleChange = (e) => {
        actions.filterReports(e.value)
    }

    return (
        <div style={{width: "15%", margin: "0 150px 0 50px"}}>
            <Select options={selectOptions} onChange={(e) => {handleChange(e)}}/>
        </div>
    )
}

export default Options;