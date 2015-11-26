import React from 'react';

export default class CellHeader extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    return (
      <li className="table_cell table_cell--header">
        {this.props.title}
      </li>
    );
  }
                                     
}