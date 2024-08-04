import ConnectDb from "@/app/api/db";
import quotesmodal from "@/app/api/modals/quotesschema";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const { newquote, newtags } = await req.json(); // Ensure the request body is parsed

    if (!newquote) {
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

    const response = await quotesmodal.findByIdAndUpdate(
      id,
      {
        quote: newquote,
        tag: newtags,
      },
      {
        new: true,
      }
    );

    if (response) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Updated successfully",
          response,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Update failed",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in API",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
