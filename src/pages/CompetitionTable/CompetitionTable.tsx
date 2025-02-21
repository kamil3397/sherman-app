import React, { FC, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export const CompetitionTable: FC = () => {
  const competitions = [
    { id: 'comp1', name: 'Konkurs 1' },
    { id: 'comp2', name: 'Konkurs 2' },
  ];

  const sampleData: Record<string, Array<{
    id: number;
    position: number;
    fullName: string;
    time: string;
    points: number
        }>> = {
          comp1: [
            { id: 1, position: 1, fullName: 'Jan Kowalski', time: '', points: 100 },
            { id: 2, position: 2, fullName: 'Anna Nowak', time: '', points: 90 },
          ],
          comp2: [
            { id: 1, position: 1, fullName: 'Piotr Wiśniewski', time: '', points: 120 },
            { id: 2, position: 2, fullName: 'Katarzyna Kowalczyk', time: '', points: 110 },
          ],
        };

  const [selectedCompetition, setSelectedCompetition] = useState<string>(competitions[0].id);
  const [rows, setRows] = useState(sampleData[selectedCompetition]);

  useEffect(() => {
    setRows(sampleData[selectedCompetition] || []);
  }, [selectedCompetition]);

  const handleCompetitionChange = (event: SelectChangeEvent<string>) => {
    setSelectedCompetition(event.target.value as string);
  };

  const columns = [
    { field: 'position', headerName: 'Miejsce', width: 100 },
    { field: 'fullName', headerName: 'Imię i Nazwisko', flex: 1 },
    { field: 'time', headerName: 'Czas', width: 150, editable: true },
    { field: 'points', headerName: 'Punkty', width: 100 },
  ];

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FormControl variant="outlined" style={{ marginBottom: 20, width: '300px' }}>
        <InputLabel id="competition-select-label">Konkurencja</InputLabel>
        <Select
          labelId="competition-select-label"
          id="competition-select"
          value={selectedCompetition}
          onChange={handleCompetitionChange}
          label="Konkurs"
        >
          {competitions.map((competition) => (
            <MenuItem key={competition.id} value={competition.id}>
              {competition.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ height: 400, width: '600px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
    </div>
  );
};
