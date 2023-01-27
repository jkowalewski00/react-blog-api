import React from "react";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PostsTypes {
  title: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  content: string;
  id?: number;
  excerpt: any;
  handleDelete: any;
}

const colors = ["#F44336", "#9C27B0", "#3F51B5", "#4CAF50", "#FFC107", "#009688"];
const categories = ["Automotive", "Food", "Science", "Policy", "Music", "Sport"];

function getCategoryColor(categoryName:String) {
  switch(categoryName) {
    case categories[0]:
      return colors[0];
    case categories[1]:
      return colors[1];
    case categories[2]:
      return colors[2];
    case categories[3]:
      return colors[3];
    case categories[4]:
      return colors[4];
    case categories[5]:
      return colors[5]; 
    default:
      return "black";
  }
}

const Posts = ({
  title,
  author,
  category,
  date,
  imageUrl,
  content,
  excerpt,
  handleDelete,
  id,
}: PostsTypes) => {
  const user = useAppSelector(state => state.user.userData);
  return (
    <MDBCol size="4">
      <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={imageUrl}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {excerpt(content)}
            <Link to={`/post/${id}`}> Read more</Link>
          </MDBCardText>
          <p style={{background:getCategoryColor(category),color:'white'}}> Category: {category}</p>
          <p> Author: {author}</p>
          <span>
            {user?.id && user?.role === 'admin'?
              <MDBBtn
                className="mt-1"
                tag="a"
                color="none"
                onClick={() => handleDelete(id)}>
                <MDBIcon
                  fas
                  icon="trash"
                  style={{ color: "#dd4b39" }}
                  size="lg"></MDBIcon>
              </MDBBtn> : null
            }
            {user?.id && user?.role === 'admin'?
              <Link to={`edit-post/${id}`}>
                <MDBIcon
                  fas
                  icon="edit"
                  style={{ color: "#55acee", marginLeft: "10px" }}
                  size="lg"></MDBIcon>
              </Link>:null
            }
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Posts;
