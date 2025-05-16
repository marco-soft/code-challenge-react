import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const SubmittalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const submittal = useSelector((state: RootState) =>
    state.submittals.items.find(item => item.number === Number(id))
  );

  if (!submittal)
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Submittal not found</Typography>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to list
        </Button>
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to list
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h1">
            #{submittal.number} {submittal.title}
          </Typography>
          <Chip
            label={submittal.status}
            color={submittal.status === 'Closed' ? 'success' : 'warning'}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'grid', gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Spec Section
            </Typography>
            <Typography>{submittal.spec}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Type
            </Typography>
            <Typography>{submittal.type}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Priority
            </Typography>
            <Typography>{submittal.priority}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Ball in Court
            </Typography>
            <Typography>{submittal.ballInCourt}</Typography>
          </Box>

          {submittal.dueDate && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Due Date
              </Typography>
              <Typography>{submittal.dueDate}</Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Response
            </Typography>
            <Typography>{submittal.response}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
