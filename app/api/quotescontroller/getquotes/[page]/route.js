import ConnectDb from "@/app/api/db";
import quotesmodal from "@/app/api/modals/quotesschema";

export async function GET(req, { params }) {
  try {
    await ConnectDb();

    let { page } = params;
    let skipcount = (page - 1) * 5;
    const response = await quotesmodal.find({}).limit(5).skip(skipcount);
    if (response && response.length > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Fetched quotes successfully",
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
          message: "No quotes found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching quotes",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
