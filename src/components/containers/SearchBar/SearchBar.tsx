import { useAtom } from "jotai";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  isLoadingAtom,
  searchCategoryAtom,
  searchCodeAtom,
  searchNameAtom,
  secondsAtom,
} from "../../../utils/atoms";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchCode, setSearchCode] = useAtom(searchCodeAtom);
  const [searchCategory, setSearchCategory] = useAtom(searchCategoryAtom);
  const [searchName, setSearchName] = useAtom(searchNameAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [, setSeconds] = useAtom(secondsAtom);

  const [code, setCode] = useState(searchCode);
  const [category, setCategory] = useState(searchCategory);
  const [name, setName] = useState(searchName);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    setSearchCode(data.get("searchCode") as string);
    setSearchCategory(data.get("searchCategory") as string);
    setSearchName(data.get("searchName") as string);

    setIsLoading(true);
    setSeconds(1);
  };

  return (
    <div style={{ marginTop: "-30px" }} className="search-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
            id="searchCode"
            name="searchCode"
            type="text"
            value={code}
          />
          <label>Code</label>
        </div>

        <div className="user-box">
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            id="searchName"
            name="searchName"
            type="text"
            value={name}
          />
          <label>Name</label>
        </div>

        <div className="user-box">
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCategory(e.target.value)
            }
            id="searchCategory"
            name="searchCategory"
            value={category}
          >
            <option style={{ color: "#000" }} value="Всички">
              Всички
            </option>
            <option style={{ color: "#000" }} value="Хранителни стоки">
              Хранителни стоки
            </option>
            <option style={{ color: "#000" }} value="Канцеларски материали">
              Канцеларски материали
            </option>
            <option style={{ color: "#000" }} value="Строителни материали">
              Строителни материали
            </option>
          </select>
        </div>

        <button style={{ marginTop: "-15px" }} type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Search
        </button>

        <button
          onClick={() => {
            setSearchCode("");
            setSearchCategory("Всички");
            setSearchName("");

            setIsLoading(true);
            setSeconds(1);
          }}
          style={{ marginTop: "-15px" }}
          type="reset"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
