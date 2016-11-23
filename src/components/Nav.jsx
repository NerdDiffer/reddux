import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { hasToken } = this.props;

    let menuData;

    const about = { name: 'about' };
    const authMenuItem = { name: 'auth', position: 'right' };

    if (!hasToken) {
      menuData = [about, authMenuItem];
    } else {
      menuData = [
        about,
        { name: 'feed' },
        { name: 'subreddits' },
        authMenuItem
      ];
    }

    return menuData.map(({ name, position, icon }, ind) => (
      <Menu.Item
        icon={icon}
        as={Link}
        to={`/${name}`}
        name={name}
        position={position}
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

const mapStateToProps = ({ auth }) => ({ hasToken: auth.hasToken });

const ConnectedNav = connect(
  mapStateToProps
)(Nav);

export default ConnectedNav;
