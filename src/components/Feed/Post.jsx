import React from 'react';
import { Item, Header, Statistic } from 'semantic-ui-react';
import {
  Thumbnail,
  ThumbnailFallback,
  HeaderAsLink,
  LinkToSubreddit,
  Permalink,
  CommentCount
} from './PostSupport';

// "self" if this is a self post;
// "image" if this is a link to an image but has no thumbnail;
// "default" if a thumbnail is not available
const fallbackImages = {
  self: 'file text outline',
  image: 'image', // no thumbnail provided for the image
  default: 'linkify',
  nsfw: 'warning'
};

const renderThumbnail = (thumbnail, url) => {
  const fallbackIcon = fallbackImages[thumbnail];

  if (!fallbackIcon) {
    return (<Thumbnail thumbnail={thumbnail} url={url} />)
  } else {
    return (<ThumbnailFallback name={fallbackIcon} url={url} />);
  }
};

// https://github.com/reddit/reddit/wiki/JSON#link-implements-votable--created
const Post = ({ data }) => {
  const {
    title, thumbnail, subreddit,
    url, permalink, over_18,
    score, num_comments, likes, selftext
  } = data;

  return (
    <Item>
      <Item.Header>
        {renderThumbnail(thumbnail, url)}
        <br />
        {over_18 ? 'nsfw' : null}
        <br />
        <Statistic size="mini" label="net upvotes" value={score} />
      </Item.Header>
      <Item.Content>
        <HeaderAsLink title={title} url={url} />
        <Item.Description>
          {selftext}
        </Item.Description>
        <Item.Content verticalAlign="bottom">
          <Item.Meta>
            <LinkToSubreddit subreddit={subreddit} />
            <Permalink permalink={permalink} />
            <CommentCount num_comments={num_comments} permalink={permalink} />
          </Item.Meta>
        </Item.Content>
      </Item.Content>
    </Item>
  );
};

export default Post;
