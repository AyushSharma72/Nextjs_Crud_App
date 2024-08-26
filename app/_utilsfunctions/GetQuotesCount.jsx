export async function GetQuotesCount() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/quotescontroller/GetQuotesCount"
    );
    if (response.status === 200) {
      const data = await response.json();
      return { success: true, count: data.QuotesCount };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error) {
    return { success: false, message: "error in pagination" };
  }
}
