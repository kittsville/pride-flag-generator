import React, { Component } from "react";


class Privacy extends Component<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>
{
  
  componentDidMount() {
    document.title = "Privacy";
  }
  

  render() {
    return (
      <div>
        <p>This website does not directly collect or transmit any data about you</p>

        <p>This site uses GitHub Sites for hosting so it&apos;s probable they log IP addresses and other basic data to prevent abuse of their services.</p>

        <p>If you have any concerns w.r.t. data collection or usage just drop me an email.</p>
      </div>
    );
  }
}


export default Privacy;
