import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../src/layout/Layout";

import PageBanner from "../src/layout/PageBanner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const WhitePaper = () => {
  useEffect(() => {

  }, []);

  return (
    <Layout pageTitle={"Whitepaper"}>
      <PageBanner pageName={"Whitepaper"} />

      <div className="metaportal_fn_collectionpage">
        <div className="container">
            <Tabs>
                <TabList>
                    <Tab>
                        <p>Title 1</p>
                    </Tab>
                    <Tab>
                        <p>Title 2</p>
                    </Tab>
                    <Tab>
                        <p>Title 3</p>
                    </Tab>
                    <Tab>
                        <p>Title 4</p>
                    </Tab>
                    <Tab>
                        <p>Title 5</p>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 1</h2>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 2</h2>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 3</h2>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 4</h2>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h2>Any content 5</h2>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// const mapStateToProps = (state) => ({
//   nfts: state.nfts.data,
// });

export default WhitePaper;
