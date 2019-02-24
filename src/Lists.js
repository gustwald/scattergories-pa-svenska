import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import data from './listData.json';
import List from './List';

const Lists = () => (
  <div className="lists">
    <Tabs>
      <TabList>
          {data.map((d, i) => (
            <Tab key={i}>{i + 1 }</Tab>
          ))}
      </TabList>
      {data.map((d, i) => (
          <TabPanel key={i}>
               <div className="list">
              <List data={d.data}/>
            </div>
          </TabPanel>
        //   {
        //     d.nextMatches[0].map((d, i) => (
        //         <span key={i}>
        //           {i +1 }.{d.team}{d.home === true ? ' (h)' : ' (b)'}&nbsp;
        //         </span>
        //       ))}
        //   }
            // <TabPanel>
            // <div className="list">
            //   <List />
            // </div>
            // </TabPanel>
      ))}
    </Tabs>
  </div>
);

export default Lists;
