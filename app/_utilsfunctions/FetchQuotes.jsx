export  async function FetchQuotes(page) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/quotescontroller/getquotes/${page}`
    );
    if (response.status === 200) {
      let data = await response.json();
      return {
        success: true,
        quote: data.response,
      };
    } else {
      return { success: false, message: "No Quotes availiable" };
    }
  } catch (error) {
    return { status: false, message: "Error" };
  }
}
