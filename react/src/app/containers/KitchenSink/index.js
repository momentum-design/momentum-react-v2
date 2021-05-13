import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { snakeCase } from '../../../lib/utils';
import KitchenSinkComponents from '../../ComponentList';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <>
        <h1>React Kitchen Sink</h1>
        <div className='row'>
          <Switch>
            {
              Object.entries(KitchenSinkComponents).map(ele =>
                {
                  const Component = ele[1];
                  return (
                      <Route
                        key={ele[0]}
                        exact
                        path={`/${snakeCase(ele[0])}`}
                        render={()=> (
                          <Component
                          />
                        )}
                      />
                    )
                  }
              )
            }
          </Switch>
        </div>
      </>
    );
  }
}
