import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import MarketedSearch from './containers/MarketedSearch/MarketedSearch';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MarketedSearch />
        </Layout>
      </div>
    )
  }
}

export default App;
