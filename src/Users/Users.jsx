import "./Users.css";
import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Table
} from "react-bootstrap";

const Users = ()=>{
  const [modalState,changeModalState] = useState(false);
  const [formState,changeFormState] = useState([]);
  const [input,setInput] = useState({
    fullname: '',
    email: '',
    mobile: ''
  });
  const [submit,changeSubmit] = useState(true);

  const allData = {};

  const getData = (e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    for(let data of formData.entries())
    {
      let key = data[0];
      let value = data[1];
      if(typeof value === "object")
      {
        value = URL.createObjectURL(value);
      }
      allData[key] = value;
    }
  }

  const insertData = (e)=>{
    getData(e);
    return (
      changeFormState((oldData)=>{
        return [
          ...oldData,
          allData
        ]
      }),
      changeModalState(false),
      setInput({
        fullname: '',
        email: '',
        mobile: ''
      })
    );
  }

  const updateData = (e)=>{
    getData(e);
    let index = sessionStorage.getItem("rowIndex");
    let tmp = [...formState];
    tmp[index] = allData;
    return (
      changeFormState(tmp),
      changeModalState(false),
      setInput({
        fullname: '',
        email: '',
        mobile: ''
      }),
      changeSubmit(true)
    );
  }

  const setInputValue = (e)=>{
    const input = e.target;
    const value = input.value;
    const prop = input.name;
    return setInput((oldData)=>{
      return {
        ...oldData,
        [prop]: value
      }
    });
  }

  const deleteUser = (index)=>{
    let tmp = [...formState];
    tmp.splice(index,1);
    return changeFormState(tmp);
  }

  const editUser = (data)=>{
    let index = data.index;
    sessionStorage.setItem("rowIndex",index);
    return (
      setInput(data),
      changeSubmit(false),
      changeModalState(true)
    );
  }

  const closeModal = ()=>{
    return (
      changeModalState(false),
      changeSubmit(true)
    );
  }

  const Tr = (data)=>{
    return (
      <>
        <tr>
          <td>{data.userData.index+1}</td>
          <td><img alt="avatar" src={data.userData.picture} width="50" height="50" className="rounded-circle" /></td>
          <td>{data.userData.fullname}</td>
          <td>{data.userData.email}</td>
          <td>{data.userData.mobile}</td>
          <td>{new Date().toLocaleDateString()}</td>
          <td>
            <Button onClick={()=>editUser(data.userData)} style={{marginRight: "8px"}} className="badge" variant="info"><i className="fa fa-edit"></i> Edit</Button>
            <Button className="badge" variant="danger" onClick={()=>deleteUser(data.userData.index)}><i className="fa fa-trash"></i> Delete</Button>
          </td>
        </tr>
      </>
    );
  }

  const design = (
    <>
      <Container className="py-4">
        <h1 className="display-4 text-center mb-4">Users</h1>
        <Button onClick={()=>changeModalState(true)} className="rounded-circle add-btn"><i className="fa fa-plus"></i></Button>
        <Modal show={modalState} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submit ? insertData : updateData}>
              <Form.Group className="mb-3">
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="text" name="fullname" value={input.fullname} onChange={setInputValue} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={input.email} onChange={setInputValue} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name="mobile" value={input.mobile} onChange={setInputValue} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control type="file" name="picture" accept="image/*"/>
              </Form.Group>
              {
                submit ? <Button className="mt-2" type="submit" variant="danger">Submit</Button> : <Button className="mt-2" type="submit" variant="success">Save</Button>
              }

            </Form>
          </Modal.Body>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S/No</th>
              <th>Picture</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              formState.map((item,index)=>{
                item['index'] = index;
                return <Tr userData={item} key={index} />
              })
            }
          </tbody>
        </Table>
      </Container>
    </>
  );
  return design;
}

export default Users;
