// utilsfunctions/deletequote.js
export async function DeleteQuote(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/quotescontroller/deletequote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: "Failed to delete quote" };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
