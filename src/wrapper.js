import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/main.scss';
import SymphonyWrapper from './pages/symphony-wrapper';
import './symphony-mock';

fetch('/bundle.json')
  .then(res => {
    return res.json();
  })
  .then(({ applications }) => {
    console.log(applications[0]);
    ReactDOM.render(
      <SymphonyWrapper bundle={applications[0]} />, document.getElementById('root'),
    );
  }).catch(e => {
    console.error("Error bootstraping the mock client, no /bundle.json present")
});

