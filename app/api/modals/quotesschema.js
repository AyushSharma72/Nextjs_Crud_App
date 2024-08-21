const mongoose = require("mongoose");

const quotesschema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const quotesmodal =
  mongoose.models.quotes || mongoose.model("quotes", quotesschema);
export default quotesmodal;
