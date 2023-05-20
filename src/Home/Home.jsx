import { useState } from "react";
import {
  demo,
  test
} from "./Home.script";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card
} from "react-bootstrap";

const Home = ()=>{
  const [modalState,changeModalState] = useState(false);
  const [formData,setFormData] = useState({});
  const [submitState,changeSubmitState] = useState(false);

  const Newuser = (data)=>{
    const design = (
      <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.user.picture} />
        <Card.Body>
          <Card.Title>{data.user.fullname}</Card.Title>
          <Card.Text>
            {
              data.user.email
            }
            <br />
            {
              data.user.mobile
            }
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      </>
    );
    return design;
  }

  const getFormData = (event)=>{
    const input = event.target;
    const prop = event.target.name;
    let value = "";
    if(input.type === "file")
    {
      let newFile = input.files[0];
      value = URL.createObjectURL(newFile);
    }
    else {
      value = input.value;
    }
    return setFormData((oldData)=>{
      return {
        ...oldData,
        [prop]: value
      }
    });
  }

  const addUser = (event)=>{
    event.preventDefault();
    console.log(formData);
    return (
      changeSubmitState(true),
      changeModalState(false)
    );
  }

  const design = (
    <>
      <Container className="py-4">
        <h1 className="display-4 text-center mb-4">Best Practices</h1>
        <Button variant="primary" onClick={()=>changeModalState(true)}>Add user</Button>
        {
          submitState ? <Newuser user={formData} /> : null
        }

        <Modal show={modalState} onHide={()=>changeModalState(false)}>
          <Modal.Header closeButton>
              <Modal.Title>New user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addUser}>
              <Form.Group className="mb-4">
                <Form.Label>Enter your name</Form.Label>
                <Form.Control type="text" name="fullname" onChange={getFormData}/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={getFormData}/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="number" name="mobile" onChange={getFormData}/>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" name="picture" accept="image/*" onChange={getFormData}/>
              </Form.Group>
              <Button variant="primary" type="submit">Add now</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
  return design;
}

export default Home;
