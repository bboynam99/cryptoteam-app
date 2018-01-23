import React, { Component } from 'react'
import { Row, Input } from 'antd'
import './Filter.css'
import Dropdown from './Dropdown/Dropdown'

const Search = Input.Search;

export default class Filter extends Component {

  constructor() {
    super();
    this.state = {
      filters: ['Rating', 'Price ascending', 'Price descending', 'Popularity', 'Price to rating ratio'],
      activeIndex: 0
    }
  }

  sortMarket(e) {
    let index = this.state.filters.indexOf(e);
    this.props.market.sortByIndex(index);
    this.setState({ activeIndex: index });
  }

  searchMarket(searchTerm) {
    this.props.market.searchWith(searchTerm);
  }

  checkSearchField(e) {
    this.props.market.checkSearchField(e.target.value);
  }


  render() {
    return (

      <Row className="filterContainer" type="flex" justify="left">
        {/* <input placeholder="Search" className="input" onChange={(e) => this.searchMarket(e)} /> */}

        <Search placeholder="Search"
          className="input-ant"
          style={{ width: '24%' }}
          // enterButton
          onChange={(e) => this.checkSearchField(e)}
          onSearch={value => this.searchMarket(value)} />

        <Dropdown items={this.state.filters}
          title="Sort by: " onChange={(e) => this.sortMarket(e)} />
      </Row >
    )
  }
}
