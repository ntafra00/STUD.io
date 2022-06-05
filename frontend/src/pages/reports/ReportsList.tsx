import React, {useContext} from 'react';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReportsContext } from '../../context/contexts/reportContext';
import DownloadIcon from '@mui/icons-material/Download';
import GradeIcon from '@mui/icons-material/Grade';
import API from "../../utils/api/api"
import fileDownload from "js-file-download"

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const ReportsList: React.FC<IProps> = ({dialogState, setDialogState}) => {

  const {state, actions} = useContext(ReportsContext);
  const handleDownload = async (fileName: string) => {
    try {
        let response = await API.get(`/file/?fileName=${fileName}`, {
            responseType: "blob"
        })
        fileDownload(response.data, fileName)   
    } catch (error) {
        console.log(error);
    }
}

  return (
    <TableContainer style={{height: "400px", width: "70%"}}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell >Report ID</TableCell>
                <TableCell >Student</TableCell>
                <TableCell>File name</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.filteredReports?.map((report, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell>{report.id}</TableCell>
                  <TableCell >{report.full_name}</TableCell>
                  <TableCell >{report.file_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {handleDownload(report.file_name)}}><DownloadIcon/></IconButton>
                    <IconButton onClick={() => {
                      actions.setSelectedReport(report.id)
                      setDialogState(true)
                      }}><GradeIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
}

export default ReportsList;
