import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchSubmittals, createSubmittal } from '../store/submittalsSlice';
import { CreateSubmittalPayload, Submittal } from '../types/submittal';
import { SubmittalsTable } from '../components/SubmittalsTable';
import { CreateSubmittalModal } from '../components/CreateSubmittalModal';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TabPanelProps } from '../types/ui';

// move to component, lets replace by mui native tab
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function SubmittalsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: submittals, loading, error } = useSelector((state: RootState) => state.submittals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchSubmittals());
  }, [dispatch]);

  const handleCreateSubmittal = (submittal: CreateSubmittalPayload) => {
    dispatch(createSubmittal(submittal));
    setIsModalOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredSubmittals = submittals.filter((submittal: Submittal) =>
    submittal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Submittals</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Items" />
          <Tab label="Packages" disabled title="Coming soon" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            startIcon={<AddIcon />}
            sx={{ mr: 1 }}
          >
            Create Item
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            disabled
            title="Coming soon"
          >
            Export
          </Button>
          <Button
            variant="outlined"
            disabled
            title="Coming soon"
          >
            Filter
          </Button>
        </Box>
        <TextField
          size="small"
          placeholder="Search by title, spec or ball in court"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled
          title="Coming soon"
          sx={{ width: 300 }}
          slotProps={{
            input: {startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <FilterListIcon />
              </InputAdornment>
            ),}
          }}
        />
      </Box>

      <TabPanel value={tabValue} index={0}>
        <SubmittalsTable submittals={filteredSubmittals} loading={loading} error={error} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SubmittalsTable 
          submittals={filteredSubmittals} 
          loading={loading} 
          error={error}
        />
      </TabPanel>

      <CreateSubmittalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmittal}
      />
    </>
  );
}
