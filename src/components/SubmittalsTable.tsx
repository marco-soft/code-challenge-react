import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SubmittalsTableProps } from '../types/ui';

export const SubmittalsTable: React.FC<SubmittalsTableProps> = ({ 
  submittals, 
  loading, 
  error, 
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange
}) => {
  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2,
        overflow: 'auto',
        position: 'relative',
        '& .MuiTableCell-root': {
          minWidth: '150px',
        },
        '& .sticky-column': {
          position: 'sticky',
          left: 0,
          zIndex: 2,
          backgroundColor: 'inherit',
        },
        '& .sticky-column-2': {
          position: 'sticky',
          zIndex: 2,
          backgroundColor: 'inherit',
        }
      }}
    >
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell className="sticky-column" sx={{ bgcolor: '#f5f5f5' }}>Status</TableCell>
            <TableCell className="sticky-column-2" sx={{ bgcolor: '#f5f5f5' }}>#</TableCell>
            <TableCell>Spec</TableCell>
            <TableCell>Rev</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Package</TableCell>
            <TableCell>Ball in court</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell>Response</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submittals.map((submittal) => (
            <TableRow 
              key={submittal.number}
              hover
              component={Link}
              to={`/submittals/${submittal.number}`}
              sx={{ 
                textDecoration: 'none',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <TableCell className="sticky-column" sx={{ bgcolor: 'white' }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: submittal.status === 'Closed' ? '#4caf50' : '#ff9800'
                  }} />
                  {submittal.status}
                </Box>
              </TableCell>
              <TableCell className="sticky-column-2" sx={{ bgcolor: 'white' }}>{submittal.number}</TableCell>
              <TableCell>{submittal.spec}</TableCell>
              <TableCell>{submittal.rev}</TableCell>
              <TableCell>
                <Tooltip title={submittal.title}>
                  <Typography noWrap sx={{ maxWidth: 200 }}>
                    {submittal.title}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>{submittal.type}</TableCell>
              <TableCell>{submittal.priority}</TableCell>
              <TableCell>{submittal.package}</TableCell>
              <TableCell>{submittal.ballInCourt}</TableCell>
              <TableCell>{submittal.dueDate || '-'}</TableCell>
              <TableCell>{submittal.response}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};
