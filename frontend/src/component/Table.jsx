import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';

const DynamicTable = ({ header, data}) => {
  
  return (
    <Box>
      <Container maxWidth="lg">
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #b3e0f2' }}>
          <Table>
            <TableHead>
              <TableRow sx={{
                backgroundColor: '#b3e0f2',
                borderRadius: '0',
              }}>
                {header.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
              </TableRow>
              </TableHead>

            <TableBody>
              {data?.map((data,index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  {header?.map((tableHeader) => (
                    <TableCell key={tableHeader.name} component="th" scope="row">
                      {data[tableHeader]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default DynamicTable;