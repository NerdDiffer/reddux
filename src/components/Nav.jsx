import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'home'
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  renderItems(activeItem) {
    const menuItems = [
      { name: 'feed' },
      { name: 'auth' },
      { name: 'subreddits' }
    ];

    return menuItems.map(({ name }, ind) => (
      <Menu.Item
        as={Link}
        to={`/${name}`}
        name={name}
        key={ind}
        active={activeItem === name}
        onClick={this.handleItemClick}
      />
    ));
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        {this.renderItems(activeItem)}
      </Menu>
    );
  }
};

export default Nav;
