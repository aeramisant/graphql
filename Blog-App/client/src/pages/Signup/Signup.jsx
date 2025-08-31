// import Button from "@restart/ui/esm/Button";
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

const SIGNUP = gql`
  mutation ($credentials: CredentialsInput!, $name: String!, $bio: String!) {
    signup(credentials: $credentials, name: $name, bio: $bio) {
      userErrors {
        message
      }
      token
    }
  }
`;

export default function Signup() {
  const [signup, { data, loading }] = useMutation(SIGNUP);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);

  const handleClick = () => {
    signup({
      variables: { credentials: { email, password }, name, bio },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signup.userErrors.length) {
        setError(data.signup.userErrors[0].message);
      }
      if (data.signup.token) {
        localStorage.setItem('token', data.signup.token);
        setError('');
      }
      console.log(`${data.signup.token}: ${localStorage.getItem('token')}`);
    }
  }, [data]);

  console.log(data, loading);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
