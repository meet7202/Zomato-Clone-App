import React, {Component} from "react";
import {
  ReactiveBase,
  DataSearch,
  RangeSlider
} from "@appbaseio/reactivesearch";
import {ReactiveMap} from "@appbaseio/reactivemaps";
import "./App.css";

class App extends Component {
  onPopoverClick = function(data) {
    return (
      <div className="popover">
        <div className="extra-info-container">
          <div className="type-container info">
            City : {data.City} 
          </div>
          <div className="name-container info">{data.Restaurant_Name}</div>
          <div className="price-container info">
            <div>
            Average Cost for two Peope: {data.Average_Cost_for_two} 
            </div>
            <div>
            Cuisines : {data.Cuisines}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="Food_App"
          credentials="L3Cz2Qz8o:4cec6726-2336-43bc-b471-660777876ef8"
          type="Food_App"
          theme={{
            colors: {
              primaryColor: "#FF0000"
            }
          }}
        >
          <div className="nav-container">
            <nav className="">
              <div class="title">Zomato Clone App</div>
            </nav>
            </div>
          <div className="filters-search-container">
            <div className="filter-container">
              <div className="dropdown">
                <button className="button">Price</button>
                <div className="dropdown-content">
                  <RangeSlider
                    componentId="PriceSensor"
                    dataField="Average_Cost_for_two"
                    title="Price Range"
                    range={{
                      start: 0,
                      end: 1000
                    }}
                    rangeLabels={{
                      start: "0",
                      end: "5000"
                    }}
                    defaultSelected={{
                      start: 50,
                      end: 250
                    }}
                    stepValue={50}
                    interval={100}
                    react={{
                      and: ["DateRangeSensor", "GuestSensor"]
                    }}
                    className="rangeFilter"
                  />
                </div>
              </div>
              

              
            </div>
            <div className="search-container">
              <DataSearch
                componentId="search"
                dataField="Restaurant_Name"
                autosuggest={false}
                placeholder="Search Restaurants..."
                iconPosition="left"
                className="search"
              />
            </div>
          </div>

          <div className="result-map-container">
            <ReactiveMap
              componentId="map"
              dataField="location"
              defaultZoom={13}
              pagination
              onPageChange={() => {
                window.scrollTo(0, 0);
              }}
              style={{
                width: "calc(100% - 280px)",
                height: "calc(100vh - 52px)"
              }}
              onPopoverClick={this.onPopoverClick}
              className="rightCol"
              showMarkerClusters={false}
              showSearchAsMove={false}
              innerClass={{
                label: "label"
              }}
              onAllData={(
                hits,
                streamHits,
                loadMore,
                renderMap,
                renderPagination
              ) => (
                <div style={{display: "flex"}}>
                  <div className="card-container">
                    {hits.map(data => (
                      <div key={data.Restaurant_ID} className="card">
                       
                        <div>
                          <h2>{data.Restaurant_Name}</h2>
                          <div></div>
                          <div className="card__price">₹{data.Average_Cost_for_two}</div>
                          <p className="card__info">
                            <div>{data.Cuisines}</div>
                            <div>{data.City}</div> 
                          </p>
                        </div>
                      </div>
                    ))}
                    {renderPagination()}
                  </div>
                  <div className="map-container">{renderMap()}</div>
                </div>
              )}
              onData={data => ({
                label: (
                  <div
                    className="marker"
                    style={{
                      width: 40,
                      display: "block",
                      textAlign: "center"
                    }}
                  >
                    <div className="extra-info">{data.Restaurant_Name}</div>
                    ₹ {data.Average_Cost_for_two}
                  </div>
                )
              })}
              react={{
                and: [ "PriceSensor",  "search"]
              }}
            />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
export default App;