import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const AdvisorView = () => {
  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Property</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Is A</DataTable.Cell>
          <DataTable.Cell>Test</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </>
  );
};

export default AdvisorView;

const styles = StyleSheet.create({
  containner: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
