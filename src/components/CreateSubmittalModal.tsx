import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { CreateSubmittalPayload } from '../types/submittal';

import { componentStyles } from '../styles/theme';
import { CreateSubmittalModalProps } from '../types/ui';

export const CreateSubmittalModal: React.FC<CreateSubmittalModalProps> = ({ open, onClose, onSubmit }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<CreateSubmittalPayload>({
    specSection: '',
    subSpecSection: '',
    title: '',
    description: '',
    type: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setShowSuccess(true);
      onClose();
      // Reset form data
      setFormData({
        specSection: '',
        subSpecSection: '',
        title: '',
        description: '',
        type: '',
      });
    } catch (error) {
      console.error('Error creating submittal:', error);
    }
  };

  return (
    <>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Item created successfully!
        </Alert>
      </Snackbar>
      <Modal open={open} onClose={onClose}>
        <Box sx={componentStyles.modal}>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Item
          </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Spec Section</InputLabel>
            <Select
              value={formData.specSection}
              label="Spec Section"
              onChange={(e) => setFormData({ ...formData, specSection: e.target.value })}
              required
            >
              <MenuItem value="000000">000000 - Attachments</MenuItem>
              <MenuItem value="093000">093000 - Acoustical Ceilings</MenuItem>
              <MenuItem value="042000">042000 - Masonry</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Sub Spec Section"
            value={formData.subSpecSection}
            onChange={(e) => setFormData({ ...formData, subSpecSection: e.target.value })}
          />
          
          <TextField
            fullWidth
            required
            sx={{ mb: 2 }}
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <TextField
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Type</InputLabel>
            <Select
              required
              value={formData.type}
              label="Type"
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="Type Import">Type Import</MenuItem>
              <MenuItem value="Attic stock custo">Attic stock custo</MenuItem>
              <MenuItem value="O&M Manuals">O&M Manuals</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Create</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    </>
  );
};
