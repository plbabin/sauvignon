import React from 'react';
import HeaderContainer from '../containers/header_container';
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
      <div className="page__container">
        <HeaderContainer title="Home Area" />
        <div className="page__container__content">
          <h1>Home Area</h1>
        </div>
      </div>
    );
  }
}

export default HomeContainer;