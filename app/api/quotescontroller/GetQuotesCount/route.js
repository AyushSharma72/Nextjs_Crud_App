import ConnectDb from "@/app/api/db";
import quotesmodal from "@/app/api/modals/quotesschema";

export async function GET(req) {
  try {
    await ConnectDb();
    const QuotesCount = await quotesmodal.countDocuments();
    if (QuotesCount) {
      return new Response(
        JSON.stringify({
          QuotesCount,
          success: true,
          message: "fetched documents successfully",
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
          message: "no quotes found",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Cannot fetch documents",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
