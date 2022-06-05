import React, {useContext, useEffect} from "react"
import {SolutionContext} from "../../context/contexts/solutionContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete'
import API from "../../utils/api/api";
import fileDownload from "js-file-download"

const SolutionList: React.FC = () => {

    const {state, actions} = useContext(SolutionContext);

    const handleDownload = async (fileName: string) => {
        try {
            let response = await API.get(`/file/?fileName=${fileName}`, {responseType: "blob"})
            fileDownload(response.data, fileName);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (id: number) => {
        actions.deleteSolution(id);
    }


    return (
        <TableContainer style={{height: "400px", width: "70%"}}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell >Solution ID</TableCell>
                <TableCell>File name</TableCell>
                <TableCell >Mark</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.solutions?.map((solution, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell >{solution.id}</TableCell>
                  <TableCell >{solution.file_name}</TableCell>
                  <TableCell>{solution.mark}</TableCell>
                  <TableCell>{solution.description}</TableCell>
                  <TableCell>
                      <IconButton onClick={() => {handleDownload(solution.file_name)}}><DownloadIcon/></IconButton>
                      <IconButton onClick={() => {handleDelete(solution.id)}}><DeleteIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default SolutionList;