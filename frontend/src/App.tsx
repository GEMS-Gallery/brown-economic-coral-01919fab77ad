import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerSearch from './components/TaxPayerSearch';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    try {
      setLoading(true);
      const result = await backend.createTaxPayer(
        newTaxPayer.tid,
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        console.error('Error adding tax payer:', result.err);
      }
    } catch (error) {
      console.error('Error adding tax payer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box className="header-image">
        <Typography variant="h2" component="h1">
          TaxPayer Management System
        </Typography>
      </Box>
      <Box mt={4}>
        <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
      </Box>
      <Box mt={4}>
        <TaxPayerSearch />
      </Box>
      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TaxPayerList taxPayers={taxPayers} />
        )}
      </Box>
    </Container>
  );
};

export default App;
