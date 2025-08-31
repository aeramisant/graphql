import './Post.css';
import AddPostModal from '../AddPostModal/AddPostModal';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

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

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    postDelete(postId: $postId) {
      userErrors {
        message
      }
      post {
        id
        title
        content
      }
    }
  }
`;
// const UPDATE_POST = gql`
//   mutation UpdatePost($postId: ID!, $post: PostInput!) {
//     postUpdate(postId: $postId, post: $post) {
//       post {
//         content
//         title
//         id
//       }
//       userErrors {
//         message
//       }
//     }
//   }
// `;

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
  const [deletePost, { loading: deletePostLoading, error: deletPostError }] =
    useMutation(DELETE_POST);
  // const [editPost, { loading: editPostLoading, error: editPostError }] =
  //   useMutation(UPDATE_POST);
  const formattedDate = new Date(Number(date));
  const isEdit = id && title && content ? true : false;

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
      <div className="buttonContainer">
        {isMyProfile && (
          <div>
            {isMyProfile ? (
              <AddPostModal
                isEdit={isEdit}
                postId={id}
                postTitle={title}
                postContent={content}
              />
            ) : null}
          </div>
        )}
        {isMyProfile && (
          <Button
            type="button"
            onClick={() => {
              deletePost({ variables: { postId: id } });
            }}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
