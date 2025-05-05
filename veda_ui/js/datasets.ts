import { DatasetData } from '@teamimpact/veda-ui';

export const datasets: Record<string, DatasetData> = {
  'no2': {
    id: 'no2',
    name: 'Nitrogen Dioxide',
    featured: true,
    sourceExclusive: 'Mock',
    description: "Since the outbreak of the novel coronavirus, atmospheric concentrations of nitrogen dioxide have changed by as much as 60% in some regions.",
    usage: [
      {
        url: 'https://nasa-impact.github.io/veda-documentation/timeseries-stac-api.html',
        label: 'Static notebook',
        title: 'Time series using STAC API statistics endpoints'
      },
      {
        url: 'https://daskhub.veda.smce.nasa.gov/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2Fnasa-impact%2Fveda-documentation&urlpath=lab%2Ftree%2Fveda-documentation%2Ftimeseries-stac-api.ipynb&branch=main',
        label: 'SMCE DaskHub',
        title: 'Time series using STAC API statistics endpoints'
      }
    ],
    media: {
      src: 'https://www.earthdata.nasa.gov/dashboard/no2--dataset-cover.80478047.jpg',
      alt: 'Power plant shooting steam at the sky.',
      author: {
        name: 'Mick Truyts',
        url: 'https://unsplash.com/photos/x6WQeNYJC1w'
      }
    },
    taxonomy: [
      {
        name: 'Grade',
        values: ['Research']
      },
      {
        name: 'Uncertainty',
        values: ['Low']
      },
      {
        name: 'Topics',
        values: ['Covid 19', 'Agriculture', 'Air Quality']
      },
      {
        name: 'Sector',
        values: ['Electricity']
      },
      {
        name: 'Producer',
        values: ['NASA']
      },
      {
        name: 'Gas Emission',
        values: ['DOS']
      },
      {
        name: 'Source',
        values: ['Mock']
      }
    ],
    infoDescription: `- Temporal Extent: January 2000 - December 2021
- Temporal Resolution: Monthly
- Spatial Extent: Global
- Spatial Resolution: 1 km x 1 km
- Data Units: Tons of carbon per 1 km x 1 km cell (monthly total)
- Data Type: Research
- Data Latency: Updated annually, following the release of an updated BP Statistical Review of World Energy report`,
    layers: [
      {
        id: 'no2-monthly',
        stacCol: 'no2-monthly',
        name: 'No2 PT',
        type: 'raster',
        stacApiEndpoint: window.drupalSettings.veda_ui.api_stac_endpoint,
        tileApiEndpoint: window.drupalSettings.veda_ui.api_raster_endpoint,
        projection: {
          id: 'polarNorth'
        },
        bounds: [-10, 36, -5, 42],
        description: 'Levels in 10¹⁵ molecules cm⁻². Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.',
        zoomExtent: [0, 20],
        sourceParams: {
          resampling_method: 'bilinear',
          bidx: 1,
          color_formula: 'gamma r 1.05',
          colormap_name: 'coolwarm',
          rescale: [0, 1.5e16]
        },
        legend: {
          unit: {
            label: 'Molecules cm3'
          },
          type: 'gradient',
          min: 'Less',
          max: 'More',
          stops: [
            '#99c5e0',
            '#f9eaa9',
            '#f7765d',
            '#c13b72',
            '#461070'
          ]
        },
        parentDataset: {
          id: 'no2'
        }
      }
    ]
  }
};

export const allExploreDatasets = Object.values(datasets)
  .filter((d: DatasetData) => !d.disableExplore);