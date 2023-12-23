import { useState, useEffect } from "react";
("use client");
interface Idea {
  title: string;
  description: string;
  // Add more properties as needed
}

interface ApiResponse {
  data: Idea[];
  meta: {
    total_pages: number;
  };
}

const ApiDataPage = () => {
  const client = useClient();
  const [data, setData] = useState<Idea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async (pageNumber: number) => {
    const page_size = 10;
    const sort = "asc";

    try {
      setLoading(true);

      const response = await client(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${page_size}&append[]=small_image&append[]=medium_image&sort=${sort}`
      );

      setData(response.data.data);
      setTotalPages(response.data.meta.total_pages);
      setError(null);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setError(`Error fetching data: ${error.message}`);
      } else {
        setError("Error fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h1>API Data Page with Pagination</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
            {/* Add more properties as needed */}
          </li>
        ))}
      </ul>
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApiDataPage;
