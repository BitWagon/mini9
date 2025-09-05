// app/api/profile/route.js
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("EpicVault");

    // Find one profile document (you may want to add filters later)
    const profile = await db.collection("profiles").findOne({});

    if (!profile) {
      return new Response(
        JSON.stringify({ message: "Profile not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Serialize _id for JSON
    profile._id = profile._id.toString();

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("EpicVault");

    const profileData = await request.json();

    // Basic validation
    if (!profileData.name || !profileData.email) {
      return new Response(
        JSON.stringify({ message: "Name and Email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update existing or insert new profile document
    const updatedProfile = await db.collection("profiles").findOneAndUpdate(
      {}, // Empty filter means update first doc or insert if none exists
      { $set: { ...profileData, updatedAt: new Date() } },
      { upsert: true, returnDocument: "after" }
    );

    if (updatedProfile.value) {
      updatedProfile.value._id = updatedProfile.value._id.toString();
    }

    return new Response(JSON.stringify(updatedProfile.value), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
