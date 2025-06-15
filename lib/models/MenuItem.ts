import mongoose from "mongoose"

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["appetizers", "mains", "desserts", "beverages"],
    },
    image: {
      type: String,
      default: "/placeholder.svg?height=200&width=300",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema)
