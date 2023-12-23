export const getAllResponse = async (
  page_number: number,
  page_size: number,
  sort: string
) => {
  try {
    const response = await fetch(
      `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page_number}&page[size]=${page_size}&append[]=small_image&append[]=medium_image&sort=${sort}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // body: JSON.stringify(data)
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
