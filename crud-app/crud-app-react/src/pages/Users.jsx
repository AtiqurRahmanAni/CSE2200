import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Table from "react-bootstrap/Table";
import { useAuthContext } from "../contexts/AuthContext";
import { Image } from "react-bootstrap";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import toast from "react-hot-toast";
let userId = "";

const Users = () => {
  const { handleError, user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users");
        const { data } = response;
        setUsers(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      const { data } = response;
      toast.success(data.message);
      setUsers(users.filter((item) => item._id !== userId));
    } catch (err) {
      handleError(err);
    }
  };

  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Username</th>
            <th>Display Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.displayName}</td>
                  <td>
                    <button
                      disabled={item._id === user._id}
                      style={{ border: "none", background: "none" }}
                      onClick={() => {
                        userId = item._id;
                        setShow(true);
                      }}
                    >
                      <Image src="delete.png" style={{ width: "20px" }} />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <DeleteConfirmationModal
        show={show}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Users;
