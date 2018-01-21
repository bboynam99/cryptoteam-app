import React, { Component } from 'react'
import { Card } from 'antd';
import PlayerCard from '../PlayerCard/PlayerCard'
import PlayerModal from '../Modals/PlayerModal'
import './PriceCard.css';

export default class PriceCard extends Component {

  openModal = () => {
    this.refs.playerModal.setVisible(true);
  }

  render() {

    return (

      <div>

        <a onClick={() => this.openModal()}>
          <Card className="cardContainer-ant">
            <PlayerCard playerInfo={this.props.playerInfo} /> <br />
            <p className="price" >{this.props.playerInfo.price} ETH</p>
          </Card>
        </a>

        <PlayerModal web3={this.props.web3}
          player={this.props.playerInfo}
          ref='playerModal' />

      </div>
    )
  }
}
