import Post from '../../components/Post/Post';
import { gql, useQuery } from '@apollo/client';

const GET_POST = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      published
      user {
        name
        email
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POST);

  if (error) {
    return (
      <div>
        <h1>Error: Could not fetch data</h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <span className="loader"></span>
      </div>
    );
  }
  const { posts } = data;
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          id={post.id}
          date={post.createdAt}
          user={post.user.name}
          published={post.published}
          // isMyProfile={post.isMyProfile}
        />
      ))}
    </div>
  );
}
