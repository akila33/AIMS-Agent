import React from 'react';

const Home = React.lazy(() => import('./views/Home.js'));
const Starter = React.lazy(() => import('./views/Starter/Starter.js'));
const CsvDataReader = React.lazy(() => import('./views/DataReader/CsvDataReader.js'));
const Output = React.lazy(() => import('./views/Output.js'));
const ServiceModel = React.lazy(() => import('./views/ServiceModel/ServiceModel.js'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/home', exact: true, name: 'Home', component: Home },
  { path: '/starter', name: 'Starter Dashboard', component: Starter },
  { path: '/csvdatareder', name: 'CSV Data Reader', component: CsvDataReader },
  { path: '/output', name: 'Output', component: Output },
  { path: '/servicemodel', name: 'Service Model', component: ServiceModel },
];

export default routes;
