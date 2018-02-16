import React, { Component } from 'react'
import Bench from './Bench/Bench'
import CustomContent from '../CustomContent/CustomContent'
import { getUser, removeOffer } from '../../firebase/db'
import './ProfilePage.css'
import authenticate from '../../firebase/auth'
import NoResults from './NoResults'
import { Row } from 'antd'
let web3;

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bench: [],
      userAddress: '',
      no_results: false,
    }

    web3 = this.props.web3;
  }

  componentDidMount() {

    let address = web3.eth.accounts[0];
    authenticate(address, (err) => {
      if (!err) {
        console.log('logged in as ' + address);
        // this.setState({ userAddress: address });
        // this.getUserData(this.state.userAddress);
        this.setState({ userAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2" });
        this.getUserData("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2");
      }
    })
  }

  getUserData(userAddress) {

    getUser(userAddress).then((userData) => {
      if (userData.owned) {

        let bench = [];

        // Getting players ids ( json keys )
        let playerIds = Object.keys(userData.owned);

        playerIds.forEach((playerId, index) => {
          // Using players ids to retrieve players data and add them to the bench
          bench.push(userData.owned[playerId]);

          // setting bench state after getting all players data
          if (index === playerIds.length - 1) {
            this.setState({ bench: bench });
          }
        });
      } else {
        this.setState({ no_results: true });
      }
    });

  }

  render() {

    let no_results = null

    if (this.state.no_results) {
      no_results = <NoResults />
    }

    return (
      <CustomContent title="Bench"
        content={
          <Row type="flex"
            justify="center">
            <Bench web3={this.props.web3} userAddress={this.state.userAddress} players={this.state.bench} />
            {no_results}
          </Row>
        } />
    )
  }
}
