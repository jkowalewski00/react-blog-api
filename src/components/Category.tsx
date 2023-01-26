import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

interface CategoryTypes {
  handleCategory: any;
  options: string[];
}

const colors = ["#F44336", "#9C27B0", "#3F51B5", "#4CAF50", "#FFC107", "#009688"];

const Category = ({ handleCategory, options }: CategoryTypes) => {
  return (
    <MDBCard style={{ width: "18rem", marginTop: "20px" }}>
      <h4>Categories</h4>
      <MDBListGroup flush="true">
        {options.map((item: string, index: number) => (
          <MDBListGroupItem
            key={index}
            style={{ cursor: "pointer",background:colors[index%colors.length],color:'white' }}
            onClick={() => handleCategory(item)}>
            {item}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
  );
};

export default Category;
