import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import isLogin from "../utils/isLogin";
import "../statics/css/categorySelect.css";

export default function CategorySelect() {
  const TOKEN = localStorage.getItem("accessToken");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (isLogin()) {
      axios
        .get("/categories/favorite", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((res) => {
          console.log(res.data.list);
          const category = res.data.list;
          setOptions((prevState) => ({
            ...prevState,
            category,
          }));
        });
    }
  }, []);
  const SelectBox = (props) => {
    return (
      <select className="category-select">
        <option>카테고리 선택</option>
        {props.options.category &&
          props.options.category.map((option) => (
            <option key={option.categorySeq} value={option.categorySeq}>
              {option.categoryName}
            </option>
          ))}
      </select>
    );
  };

  return <SelectBox options={options}></SelectBox>;
}
