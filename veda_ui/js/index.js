import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { 
  VedaUIProvider, 
  ExplorationAndAnalysis,
  DevseedUiThemeProvider,
  ReactQueryProvider,
  externalDatasetsAtom,
  timelineDatasetsAtom,
  useTimelineDatasetAtom,
  DatasetSelectorModal
} from '@teamimpact/veda-ui';
import { useAtom, useSetAtom } from 'jotai';
import { QueryClient } from '@tanstack/react-query';
import { allExploreDatasets } from './datasets';
import { theme } from './theme';

// Access Drupal settings
const drupalSettings = window.drupalSettings.veda_ui;

// Create a client
const queryClient = new QueryClient();

// Root component initialization
function App() {
  return (
    <div className="veda-ui-scope">
    <BrowserRouter>
      <ReactQueryProvider client={queryClient}>
        <DevseedUiThemeProvider theme={theme}>
          <VedaUIProvider
            config={{
              envMapboxToken: drupalSettings.mapbox_token,
              envApiStacEndpoint: drupalSettings.api_stac_endpoint,
              envApiRasterEndpoint: drupalSettings.api_raster_endpoint,
              navigation: {
                LinkComponent: 'a',
                linkProps: {
                  pathAttributeKeyName: 'href'
                }
              },
              theme:theme
            }}
          >
            <ExplorationWrapper />
          </VedaUIProvider>
        </DevseedUiThemeProvider>
      </ReactQueryProvider>
    </BrowserRouter>
    </div>
  );
}

// Wrapper component to handle dataset management
function ExplorationWrapper() {
  const setExternalDatasets = useSetAtom(externalDatasetsAtom);
  const [timelineDatasets, setTimelineDatasets] = useTimelineDatasetAtom();
  const [datasetModalRevealed, setDatasetModalRevealed] = useState(!timelineDatasets.length);

  // Initialize with available datasets
  React.useEffect(() => {
    setExternalDatasets(allExploreDatasets);
  }, [setExternalDatasets]);

  const openModal = () => setDatasetModalRevealed(true);
  const closeModal = () => setDatasetModalRevealed(false);

  return (
    <>
      <ExplorationAndAnalysis
        datasets={timelineDatasets}
        setDatasets={setTimelineDatasets}
        openDatasetsSelectionModal={openModal}
      />
      <DatasetSelectorModal
        revealed={datasetModalRevealed}
        close={closeModal}
        datasets={allExploreDatasets}
        timelineDatasets={timelineDatasets}
        setTimelineDatasets={setTimelineDatasets}
        emptyStateContent={
          <>
            <p>There are no datasets to show with the selected filters.</p>
            <p>
              This tool allows the exploration and analysis of time-series
              datasets in raster format. For a comprehensive list of available
              datasets, please visit the Data Catalog.
            </p>
          </>
        }
      />
    </>
  );
}

const container = document.getElementById('veda-ui-root');
const root = createRoot(container);
root.render(<App />);