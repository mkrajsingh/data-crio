import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (!res.ok) {
        alert("failed to fetch data");
      }
      const data = await res.json();
      setData(data);
      const totalPages = Math.ceil(data.length / 10);
      setTotalPages(totalPages);
      setError(null);
    } catch (error) {
      console.error("Unable to fetch data: ", error);
      setError(error.message);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIdx = (currentPage - 1) * 10;
  const endIdx = startIdx + 10;
  const currentData = data.slice(startIdx, endIdx);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      {error && <h1>{error}</h1>}
      <div className={styles.heading}>
        <h1>Employee Data Table</h1>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {currentData.map((employee, idx) => (
            <tr key={idx}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.btns}>
        <button onClick={handlePrev}>Previous</button>
        <button className={styles.pageNumber}>{currentPage}</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
