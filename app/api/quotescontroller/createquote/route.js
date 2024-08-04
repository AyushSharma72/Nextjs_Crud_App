import ConnectDb from "../../db";
import quotesmodal from "../../modals/quotesschema";

export async function POST(req) {
  try {
    // Ensure the request body is present
    if (!req.body) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Request body is missing.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid JSON input.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { tag, quote } = body;

    // Validate input
    if (!tag || !quote) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Tag and quote are required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await ConnectDb();

    // Save quote to database
    const newQuote = new quotesmodal({
      quote: quote,
      tag: tag,
    });

    const response = await newQuote.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Quote posted successfully.",
        data: response,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error posting quote:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in API.",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
