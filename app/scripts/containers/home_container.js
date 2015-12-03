import React from 'react';
// import ItemList from '../components/itemList';
// import ItemStore from '../stores/itemStore';
// import ItemActions from '../actions/itemActions';

class HomeContainer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      items : [],
      loading: false
    };
  }

  // componentDidMount() {
  //   this.unsubscribe = ItemStore.listen(this.onStatusChange.bind(this));
  //   ItemActions.loadItems();
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  // onStatusChange(state) {
  //   this.setState(state);
  // }
//<ItemList { ...this.state } />
  render() {

    return (
      <div className="page-container__content">
        <h1>Home Area</h1>
        
      </div>
    );
  }
}

export default HomeContainer;