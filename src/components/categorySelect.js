import axios from "axios";
import { useMemo, useState } from "react";
import isLogin from "../utils/isLogin";
import "../statics/css/categorySelect.css";

export default function CategorySelect() {
  const TOKEN = localStorage.getItem("accessToken");
  const [options, setOptions] = useState([]);

  useMemo(() => {
    if (isLogin()) {
      axios
        .get("/categories/favorite", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data.list);
          const categories = res.data.list;
          setOptions((prevState) => ({
            ...prevState,
            categories,
          }));
        });
    }
  }, []);
  console.log(options);
  const SelectBox = (props) => {
    console.log(props);
    return (
      <select className="category-select">
        <option>카테고리 선택</option>
        {props.options.categories.map((option) => (
          <option key={option.categorySeq} value={option.categorySeq}>
            {option.categoryName}
          </option>
        ))}
      </select>
    );
  };

  return <SelectBox options={options}></SelectBox>;
}
