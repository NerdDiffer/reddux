import React from 'react';
import { Item, Icon } from 'semantic-ui-react';

const DefaultImage = ({ url }) => (
  <a href={url}>
    <Icon
      name="linkify"
      link
      color="black"
      size="large"
    />
  </a>
);

const Post = (props) => {
  const { thumbnail, url, title } = props;

  const renderImage = () => {
    if (thumbnail === 'default') {
      return (<DefaultImage url={url} />);
    } else {
      return (<Item.Image size="large" src={thumbnail} />);
    }
  };

  return (
    <Item>
      {renderImage()}
      <Item.Header as="a">{title}</Item.Header>
      <Item.Meta>{url}</Item.Meta>
    </Item>
  );
};

export default Post;
