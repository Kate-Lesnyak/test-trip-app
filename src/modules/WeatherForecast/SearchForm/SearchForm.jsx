import { IoSearch } from "react-icons/io5";

import styles from "./searchForm.module.scss";

function SearchForm({ filter, onChange }) {
  //   const [searchValue, setSearchValue] = useState("");

  //   const searchValueRef = useRef(false);

  //   useEffect(() => {
  //     searchValueRef.current.focus();
  //   }, []);

  //   const handleChange = ({ target }) => {
  //     const { value } = target;
  //     // setSearchValue(value.toLowerCase());
  //     setSearchValue(value);
  //     console.log(value);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!searchValue.trim()) {
  //       return Notify.info("Please, enter your trip!");
  //     }
  //     onSubmit(searchValue);
  //     reset();
  //   };

  //   const reset = () => {
  //     setSearchValue("");
  //   };

  return (
    <form className={styles.form}>
      <button className={styles.btnSearch}>
        <IoSearch size={20} />
      </button>
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={onChange}
        placeholder="Search your trip"
        autoFocus
        autoComplete="off"
      />
    </form>
  );
}

export default SearchForm;
