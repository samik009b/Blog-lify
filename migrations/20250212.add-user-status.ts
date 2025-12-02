import mongoose from "mongoose";

const uri = `${process.env.MONGO_URI}/${process.env.MIGRATE_DB_NAME}`;

async function run() {
    await mongoose.connect(uri);

    const User = mongoose.connection.collection("users");

    // add status field
    await User.updateMany({ status: { $exists: false } }, { $set: { status: "active" } });

    console.log("Migration complete: added status field");
    process.exit(0);
}

run().catch((err) => {
    console.error("Migration error", err);
    process.exit(1);
});
