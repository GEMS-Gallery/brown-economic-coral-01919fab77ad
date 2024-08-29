import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const TaxPayerSearch: React.FC = () => {
  const [tid, setTid] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!tid) {
      setError('Please enter a TID');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await backend.getTaxPayerByTID(tid);
      if (result.length > 0) {
        setSearchResult(result[0]);
      } else {
        setError('No TaxPayer found with the given TID');
      }
    } catch (error) {
      console.error('Error searching for TaxPayer:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search TaxPayer by TID
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          value={tid}
          onChange={(e) => setTid(e.target.value)}
          label="TID"
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{ ml: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>
      {searchResult && (
        <Box mt={2}>
          <Typography variant="subtitle1">Search Result:</Typography>
          <Typography>TID: {searchResult.tid}</Typography>
          <Typography>Name: {searchResult.firstName} {searchResult.lastName}</Typography>
          <Typography>Address: {searchResult.address}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaxPayerSearch;
