import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

const CREATE_POST = gql`
  mutation ($post: PostInput!) {
    postCreate(post: $post) {
      post {
        title
        content
        published
        createdAt
        user {
          name
        }
      }
      userErrors {
        message
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($postId: ID!, $post: PostInput!) {
    postUpdate(postId: $postId, post: $post) {
      post {
        content
        title
        id
      }
      userErrors {
        message
      }
    }
  }
`;

export default function AddPostModal({
  isEdit,
  postId,
  postTitle,
  postContent,
}) {
  const [createPost, { loading, error: networkError }] =
    useMutation(CREATE_POST);
  const [editPost, { loading: editPostLoading, error: editPostError }] =
    useMutation(UPDATE_POST);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(postContent || '');
  const [title, setTitle] = useState(postTitle || '');
  const [formError, setFormError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormError('');
    setShow(true);
  };

  const handleClick = async () => {
    if (!title.trim() || !content.trim()) {
      setFormError('Title and content are required.');
      return;
    }
    setFormError('');
    try {
      if (!isEdit) {
        const res = await createPost({
          variables: { post: { title: title.trim(), content: content.trim() } },
        });
        const errs = res.data?.postCreate?.userErrors;
        if (errs?.length) {
          setFormError(errs[0].message);
          return;
        }
      } else {
        const res = await editPost({
          variables: {
            postId,
            post: { title: title.trim(), content: content.trim() },
          },
        });
        const errs = res.data?.postCreate?.userErrors;
        if (errs?.length) {
          setFormError(errs[0].message);
          return;
        }
      }
      setTitle('');
      setContent('');
      handleClose();
    } catch (_) {}
  };

  // useEffect(() => {
  //   if (data) {
  //     if (data.postCreate.userErrors.length) {
  //       setError(data.postCreate.userErrors[0].message);
  //     }
  //     if (data.postCreate.token) {
  //       localStorage.setItem('token', data.postCreate.token);
  //       setError('');
  //     }
  //     console.log(`${data.postCreate.token}: ${localStorage.getItem('token')}`);
  //   }
  // }, [data]);

  return (
    <>
      <Button variant="primary" onClick={handleShow} type="button">
        {isEdit ? 'Edit' : 'Add Post'}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write something…"
              />
            </Form.Group>
          </Form>
          {(formError || networkError) && (
            <div style={{ color: 'crimson', marginTop: 8 }}>
              {formError || networkError?.message}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} type="button">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClick}
            disabled={loading}
            type="button">
            {loading ? 'Adding…' : isEdit ? 'Edit' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
