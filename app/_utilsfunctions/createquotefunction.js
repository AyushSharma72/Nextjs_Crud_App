export async function CreateQuotefunction(quote, tag) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/quotescontroller/createquote`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote, tag }),
      },
    );

    if (response.status === 201) {
      return { success: true };
    } else {
      return {
        success: false,
        message:
          response.status === 400
            ? "Please provide proper input"
            : "Error in API",
      };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
