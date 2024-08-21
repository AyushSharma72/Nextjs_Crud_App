import ConnectDb from "@/app/api/db";
import quotesmodal from "@/app/api/modals/quotesschema";

export async function DELETE(req, { params }) {
  try {
    await ConnectDb(); // Ensure database connection is established

    const { id } = params;
    if (!id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID parameter is missing",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const response = await quotesmodal.findByIdAndDelete(id);
    if (response) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Quote deleted successfully",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Quote not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error deleting quote",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
