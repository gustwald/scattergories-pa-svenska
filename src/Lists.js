import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import data from './listData.json';
import List from './List';

class Lists extends Component {
  constructor() {
    super();
    this.state = { defaultTab: 0 };
  }
  saveCurrentList(index) {
    if (window && typeof window !== 'undefined') {
        window.localStorage.setItem('currentList', index);
    }
   }
  render() {
    const defaultTab = localStorage.getItem('currentList');
    return (
      <div className="lists">
        {defaultTab && <Tabs defaultIndex={parseInt(defaultTab)} onSelect={index => this.saveCurrentList(index)}>
          <TabList>
            {data.map((d, i) => (
              <Tab key={i} index={i + 1}>{i + 1}</Tab>
            ))}
          </TabList>
          {data.map((d, i) => (
            <TabPanel key={i}>
              <div className="list">
                <List data={d.data} />
              </div>
            </TabPanel>
          ))}
        </Tabs>}
      </div>
    );
  }
}

export default Lists;
