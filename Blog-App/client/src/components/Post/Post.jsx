import './Post.css';
import { gql, useMutation } from '@apollo/client';

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        published
        title
        id
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation UnpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        published
        title
        id
      }
    }
  }
`;

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const [publishPost, { loading: publishLoading, error: publishError }] =
    useMutation(PUBLISH_POST);
  const [unpublishPost, { loading: unpublishLoading, error: unpublishError }] =
    useMutation(UNPUBLISH_POST);
  const formattedDate = new Date(Number(date));

  return (
    <div className={`Post${published ? '' : ' Post--draft'}`}>
      {isMyProfile && published === false && (
        <button
          type="button"
          className="Post__publish"
          disabled={publishLoading}
          onClick={() => {
            publishPost({ variables: { postId: id } });
          }}>
          publish
        </button>
      )}
      {isMyProfile && published === true && (
        <button
          type="button"
          disabled={unpublishLoading}
          className="Post__publish"
          onClick={() => {
            unpublishPost({ variables: { postId: id } });
          }}>
          unpublish
        </button>
      )}
      <div className="Post__header-container">
        <h3>{title}</h3>
        <h4>
          Created At {`${formattedDate}`.split(' ').splice(0, 3).join(' ')} by{' '}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
